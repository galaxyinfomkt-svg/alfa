"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

export default function BeforeAfter({ beforeSrc, afterSrc, beforeAlt, afterAlt }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
    if (e.key === "Home") setPos(0);
    if (e.key === "End") setPos(100);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden bg-black cursor-ew-resize"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* AFTER image — base layer */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover pointer-events-none"
        draggable={false}
      />

      {/* BEFORE image — clipped overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Label badges */}
      <span className="absolute top-4 left-4 bg-black/70 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider pointer-events-none border border-white/10">
        Before
      </span>
      <span className="absolute top-4 right-4 bg-alfa-gold text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider pointer-events-none">
        After
      </span>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-alfa-gold shadow-[0_0_20px_rgba(184,150,62,0.6)] pointer-events-none"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      />
      <button
        type="button"
        aria-label="Drag to compare before and after"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        role="slider"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-alfa-gold border-4 border-white shadow-2xl flex items-center justify-center cursor-ew-resize focus:outline-none focus:ring-4 focus:ring-alfa-gold/40"
        style={{ left: `${pos}%`, transform: "translate(-50%, -50%)" }}
      >
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
        </svg>
      </button>
    </div>
  );
}
