"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Mauricio Betancur. All rights
              reserved.
            </p>
          </div>

          {/* Built with */}
          <div className="text-sm text-muted-foreground">
            <p>
              Built with <span className="text-foreground">Next.js</span>,{" "}
              <span className="text-foreground">Tailwind</span> &{" "}
              <span className="text-primary">GSAP</span>
            </p>
          </div>

          {/* Back to top */}
          <button
            ref={buttonRef}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
