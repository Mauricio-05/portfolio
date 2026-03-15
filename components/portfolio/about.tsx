"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  // Hover 3D effect handlers para la foto
  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const photo = photoRef.current;
    if (!photo) return;
    const rect = photo.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    gsap.to(photo, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handlePhotoMouseLeave = () => {
    const photo = photoRef.current;
    if (!photo) return;
    setIsPhotoHovered(false);
    gsap.to(photo, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Foto animation
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: photoRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Line reveal
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Content paragraphs stagger
      if (contentRef.current) {
        const paragraphs = contentRef.current.querySelectorAll("p");
        gsap.fromTo(
          paragraphs,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Animate highlighted text
        const highlights = contentRef.current.querySelectorAll(".highlight");
        gsap.fromTo(
          highlights,
          { backgroundSize: "0% 100%" },
          {
            backgroundSize: "100% 100%",
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column - Foto y Título */}
          <div className="lg:col-span-4 flex flex-col justify-center min-h-full">
            <div className="flex flex-col items-center justify-center h-full w-full">
              {/* Foto LinkedIn en bolita */}
              <div
                ref={photoRef}
                className="flex justify-center items-center mb-6"
                onMouseEnter={() => setIsPhotoHovered(true)}
                onMouseMove={handlePhotoMouseMove}
                onMouseLeave={handlePhotoMouseLeave}
                style={{ transformStyle: "preserve-3d", cursor: "pointer" }}
              >
                <img
                  src="./img/FotoLinkedln.jpeg"
                  alt="Foto LinkedIn"
                  className="w-64 h-64 rounded-full object-cover shadow-lg"
                  draggable={false}
                />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                01
              </span>
              <h2
                ref={headingRef}
                className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-center"
              >
                Acerca de mí
              </h2>
              <div
                ref={lineRef}
                className="mt-6 w-16 h-px bg-primary mx-auto"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div ref={contentRef} className="lg:col-span-8 space-y-8">
            <p className="text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed text-foreground">
              Soy un desarrollador apasionado por{" "}
              <span className="highlight bg-gradient-to-r from-primary/20 to-primary/20 bg-no-repeat bg-left-bottom">
                construir aplicaciones escalables
              </span>{" "}
              y desplegar proyectos a gran escala.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Actualmente, soy Ingeniero Backend y me especializo en el
              desarrollo de servicios backend en uno de los bancos más grandes
              de Colombia. Trabajo principalmente en el diseño, desarrollo y
              mantenimiento de microservicios y arquitecturas modernas,
              utilizando Java y tecnologías cloud como AWS para construir
              sistemas escalables, resilientes y preparados para entornos de
              alta demanda.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              En el pasado, he tenido la oportunidad de desarrollar software
              desempeñándome como{" "}
              <span className="text-foreground">Full Stack Developer </span>
              en diferentes entornos, incluyendo
              <span className="text-foreground">
                {" "}
                entidades gubernamentales
              </span>
              , participando en el desarrollo de
              <span className="text-foreground">
                {" "}
                diversos productos digitales
              </span>
              .
            </p>

            {/* Stats */}
            <div className="pt-8 grid grid-cols-3 gap-8 border-t border-border">
              <div>
                <span className="text-3xl sm:text-4xl font-bold text-primary">
                  4+
                </span>
                <p className="mt-2 text-sm text-muted-foreground">
                  Years of Experience
                </p>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-bold text-primary">
                  7+
                </span>
                <p className="mt-2 text-sm text-muted-foreground">
                  Projects Completed
                </p>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-bold text-primary">
                  4+
                </span>
                <p className="mt-2 text-sm text-muted-foreground">
                  Happy Clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
