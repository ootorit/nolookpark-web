"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay before the reveal transition starts (ms). Useful for staggering. */
  delay?: number;
  /** Override the transition duration (ms). Defaults to the CSS value (1.2s). */
  duration?: number;
  /** "up" (default) slides up; "zoom" scales up from center. */
  variant?: "up" | "zoom";
};

/**
 * Fades + slides its children into view once they enter the viewport.
 * No-op (renders visible immediately) when reduced motion is preferred
 * or IntersectionObserver is unavailable.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration,
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${variant === "zoom" ? "reveal-zoom" : ""} ${
        visible ? "is-visible" : ""
      } ${className}`}
      style={
        delay || duration
          ? {
              ...(delay ? { transitionDelay: `${delay}ms` } : {}),
              ...(duration ? { transitionDuration: `${duration}ms` } : {}),
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
