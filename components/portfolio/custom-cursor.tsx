"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Only show custom cursor on desktop
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hoverable elements
    const handleElementMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hoverable")
      ) {
        setIsHovering(true);
        gsap.to(cursor, {
          scale: 2,
          duration: 0.3,
          ease: "power3.out",
        });
      }
    };

    const handleElementMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hoverable")
      ) {
        setIsHovering(false);
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: "power3.out",
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleElementMouseEnter);
    document.addEventListener("mouseout", handleElementMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleElementMouseEnter);
      document.removeEventListener("mouseout", handleElementMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Outer cursor ring */}
      <div
        ref={cursorRef}
        className={cn(
          "fixed top-0 left-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] transition-opacity duration-300 hidden md:block",
          isHovering ? "mix-blend-normal" : "mix-blend-difference",
          isVisible ? "opacity-100" : "opacity-0",
        )}
      >
        <div
          className={cn(
            "w-full h-full rounded-full border transition-all duration-300",
            isHovering
              ? "border-primary bg-transparent"
              : "border-foreground/50",
          )}
        />
      </div>

      {/* Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className={cn(
          "fixed top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 hidden md:block",
          isVisible ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="w-full h-full rounded-full bg-foreground" />
      </div>
    </>
  );
}
