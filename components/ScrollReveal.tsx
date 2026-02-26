import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

/**
 * Lightweight server component wrapper.
 * Content is always visible (great for performance & SEO).
 * CSS scroll-driven animations via animation-timeline: view()
 * provide progressive enhancement in supported browsers.
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const dirClass: Record<string, string> = {
    up: "sr-up",
    left: "sr-left",
    right: "sr-right",
    none: "",
  };

  return (
    <div
      className={`sr ${dirClass[direction] || ""} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
