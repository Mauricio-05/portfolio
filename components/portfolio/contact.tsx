"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Mauricio-05",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jbetancur21/",
    icon: Linkedin,
  },
  // {
  //   name: "Twitter",
  //   href: "https://twitter.com",
  //   icon: Twitter,
  // },
  {
    name: "Email",
    href: "mailto:juanmmao12@gmail.com",
    icon: Mail,
  },
  {
    name: "Whatsapp",
    href: "https://wa.link/cyurnd",
    icon: Phone,
  },
  {
    name: "Descargar CV",
    href: "/pdf/Mauricio_Betancur_CV.pdf",
    icon: Download,
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Social links stagger
      if (linksRef.current) {
        const links = linksRef.current.querySelectorAll(".social-link");
        gsap.fromTo(
          links,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 lg:py-48 bg-card/30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div ref={headingRef}>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              04
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground">
              ¡Trabajemos
              <br />
              <span className="text-primary">juntos!</span>
            </h2>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center">
            <div ref={contentRef} className="space-y-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Siempre me interesa conocer nuevos proyectos y oportunidades. Si
                tienes alguna pregunta o simplemente quieres saludar, no dudes
                en contactarme.
              </p>

              <a
                href="mailto:hello@alexrivera.dev"
                className="group inline-flex items-center gap-3 text-2xl sm:text-3xl font-medium text-foreground hover:text-primary transition-colors"
              >
                <span>juanmmao12@gmail.com</span>
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              {/* Social Links */}
              <div ref={linksRef} className="flex gap-4 pt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link group w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all"
                    aria-label={link.name}
                  >
                    <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </section>
  );
}
