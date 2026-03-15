"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Animate title letters
      if (titleRef.current) {
        const name = titleRef.current.querySelector(".name");
        const title = titleRef.current.querySelector(".title");

        tl.fromTo(
          name,
          { y: 120, opacity: 0, rotationX: -40 },
          { y: 0, opacity: 1, rotationX: 0, duration: 1.2 },
        ).fromTo(
          title,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.6",
        );
      }

      // Animate subtitle
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4",
        );
      }

      // Animate description
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4",
        );
      }

      // Animate scroll indicator
      if (scrollRef.current) {
        tl.fromTo(
          scrollRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.2",
        );

        // Continuous bounce animation
        gsap.to(scrollRef.current.querySelector(".arrow"), {
          y: 8,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      // Animate background gradient
      gsap.to(".hero-gradient", {
        backgroundPosition: "100% 100%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="hero-gradient absolute inset-0 bg-gradient-to-br from-background via-background to-card opacity-50" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <h1 ref={titleRef} className="perspective-1000">
          <span className="name block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground">
            Mauricio Betancur
          </span>
          <span className="title block mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-primary">
            Desarrollador de software
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-light"
        >
          Construyendo soluciones digitales en la intersección entre tecnología,
          rendimiento y experiencia de usuario.
        </p>

        <p
          ref={descRef}
          className="mt-6 text-sm text-muted-foreground/70 max-w-lg mx-auto"
        >
          Desarrollo aplicaciones web escalables combinando diseño intuitivo con
          ingeniería sólida. Me especializo en TypeScript y Java tanto en
          frontend como en backend, creando sistemas eficientes, mantenibles y
          preparados para producción.
        </p>

        {/* Scroll Indicator */}
        <div
          ref={scrollRef}
          className="flex flex-col items-center gap-2 mt-8 mx-auto w-fit"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
          </span>
          <div className="arrow">
            <ArrowDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
