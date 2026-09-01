#!/usr/bin/env bash
#
# prepare-videos.sh — transforma a filmagem de obra crua num video web e
# imprime a linha pronta para colar em data/videos.ts.
#
# POR QUE: os videos da Alfa estao no Drive como .MOV de celular, de 2 MB a
# 796 MB. Nenhum deles pode ir para o site como esta: um .MOV de iPhone e
# HEVC, que nao toca em Chrome no Windows nem em Firefox, e o de 796 MB nao
# toca em lugar nenhum. Este script gera o MP4 H.264 que toca em tudo, a capa,
# e le a duracao real do arquivo — em vez de alguem chutar o `duration` do
# schema, que e exatamente o que a regra de honestidade de data/videos.ts
# proibe.
#
# USO:
#   ./scripts/prepare-videos.sh <arquivo-de-entrada> <slug> [citySlug] [serviceSlug]
#
# EXEMPLO:
#   ./scripts/prepare-videos.sh ~/Downloads/"Siding In Douglas MA.mp4" \
#        siding-douglas-ma douglas siding
#
# Requer ffmpeg e ffprobe.

set -euo pipefail

if [ $# -lt 2 ]; then
  sed -n '2,25p' "$0" | sed 's/^# \{0,1\}//'
  exit 1
fi

IN="$1"
SLUG="$2"
CITY="${3:-}"
SERVICE="${4:-}"

command -v ffmpeg  >/dev/null || { echo "ffmpeg nao encontrado."; exit 1; }
command -v ffprobe >/dev/null || { echo "ffprobe nao encontrado."; exit 1; }
[ -f "$IN" ] || { echo "arquivo nao encontrado: $IN"; exit 1; }

OUTDIR="public/videos"
mkdir -p "$OUTDIR"
MP4="$OUTDIR/$SLUG.mp4"
JPG="$OUTDIR/$SLUG.jpg"

echo "→ transcodificando (H.264 + AAC, faststart, largura max 1280)…"
ffmpeg -loglevel error -y -i "$IN" \
  -vcodec libx264 -crf 24 -preset slow \
  -vf "scale='min(1280,iw)':-2" \
  -acodec aac -b:a 128k \
  -movflags +faststart \
  "$MP4"

echo "→ extraindo a capa do segundo 2…"
ffmpeg -loglevel error -y -ss 00:00:02 -i "$MP4" -vframes 1 -q:v 3 "$JPG"

# duracao real -> ISO-8601
SECS=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$MP4" | cut -d. -f1)
M=$((SECS / 60)); S=$((SECS % 60))
if [ "$M" -gt 0 ]; then DUR="PT${M}M${S}S"; else DUR="PT${S}S"; fi
TODAY=$(date +%F)

IN_KB=$(du -k "$IN"  | cut -f1)
OUT_KB=$(du -k "$MP4" | cut -f1)
POSTER_KB=$(du -k "$JPG" | cut -f1)

echo
echo "  entrada : ${IN_KB} KB"
echo "  MP4     : ${OUT_KB} KB   ($MP4)"
echo "  capa    : ${POSTER_KB} KB   ($JPG)"
echo "  duracao : ${SECS}s -> $DUR"
echo
echo "Cole isto no array \`videos\` de data/videos.ts, e troque title e"
echo "description pelo que o video realmente mostra:"
echo
cat <<ENTRY
  {
    id: "$SLUG",
    src: "/videos/$SLUG.mp4",
    poster: "/videos/$SLUG.jpg",
    title: "TROCAR — o que o video mostra",
    description: "TROCAR — uma ou duas frases factuais sobre a obra filmada.",
    uploadDate: "$TODAY",
    duration: "$DUR",$( [ -n "$CITY" ]    && printf '\n    citySlug: "%s",'    "$CITY" )$( [ -n "$SERVICE" ] && printf '\n    serviceSlug: "%s",' "$SERVICE" )
  },
ENTRY
