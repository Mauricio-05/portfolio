"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "Acerca de mi" },
  { href: "#projects", label: "Proyectos" },
  { href: "#skills", label: "Habilidades" },
  { href: "#contact", label: "Contacto" },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Initial animation
    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "expo.out" },
    );

    // Scroll detection
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section detection robusta
      const sections = Array.from(document.querySelectorAll("section[id]"));
      let currentSection = "";
      let minDistance = Number.POSITIVE_INFINITY;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Calcula la distancia desde el top de la ventana
        const distance = Math.abs(rect.top - 100);
        if (rect.top <= 100 && rect.bottom > 100 && distance < minDistance) {
          currentSection = `#${section.id}`;
          minDistance = distance;
        }
      });

      // Si estamos al final de la página, marcar la última sección
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;
      if (
        (Math.abs(scrollPosition - pageHeight) < 2 ||
          scrollPosition > pageHeight) &&
        sections.length > 0
      ) {
        currentSection = `#${sections[sections.length - 1].id}`;
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="text-lg font-medium tracking-tight text-foreground hover:text-primary transition-colors"
          >
            MB<span className="text-primary">.</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn(
                  "relative text-sm tracking-wide transition-colors",
                  activeSection === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="relative z-10">{link.label}</span>
                {activeSection === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-primary" />
                )}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, "#contact")}
            className="group relative px-5 py-2.5 text-sm font-medium overflow-hidden rounded-full border border-border hover:border-primary transition-colors"
          >
            <span className="relative z-10 text-foreground group-hover:text-primary transition-colors">
              ¡Hablemos!
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}
