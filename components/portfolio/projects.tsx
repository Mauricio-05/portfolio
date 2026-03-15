"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github, Download } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Admin Instalcom",
    description:
      "Desarrollo freelance de una aplicación web para la automatización del cálculo de horas laborales, disponible en la nube 24/7, con almacenamiento seguro y respaldado, y con capacidad de integración con sistemas de nómina.",
    tags: ["Php", "Angular", "TypeScript", "Scss", "HTML5"],
    image: {
      url: "/img/Screenshot_1.png",
      background: "linear-gradient(135deg, #1DB954 0%, #191414 100%)",
    },
    link: "https://admin-instalcom.onrender.com/authentication/login",
    secondary: { type: "download", url: "/pdf/Presentacion_Admin_Times.pdf" },
  },
  {
    title: "API Rest books.",
    description:
      "Esta es una API RESTful construida con Spring Boot que permite gestionar libros y autores. Proporciona endpoints para crear, leer, actualizar y eliminar tanto libros como autores. También permite asociar libros con autores.",
    tags: ["Java", "Spring Boot", "JPA", "SQL", "PostgreSQL", "Docker"],
    image: {
      url: "/img/Screenshot_4.png",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    link: "#",
    secondary: {
      type: "repo",
      url: "https://github.com/Mauricio-05/api-rest-books",
    },
  },
  {
    title: "Geomedellin",
    description:
      "Desarrollo del Portal de Datos Geográficos del Municipio de Medellín durante mi experiencia en H&G Consultores S.A.S., una plataforma que proporciona acceso a información geoespacial de la ciudad para consulta y análisis.",
    tags: [
      "ReactJs",
      "NodeJs",
      "TypeScript",
      "AdonisJs",
      "PostgresSQL",
      "Docker",
    ],
    image: {
      url: "/img/Screenshot_2.png",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    link: "https://www.medellin.gov.co/geomedellin/",
    secondary: { type: "", url: "" },
  },
  {
    title: "Evolucion de canales digitales para Bancolombia",
    description:
      "Colaboración como proveedor externo en la evolución de aplicaciones estratégicas que soportan los canales digitales de Bancolombia, con enfoque en modernización tecnológica y mejora continua.",
    tags: [
      "Elixir",
      "Java",
      "Spring boot",
      "WebFlux",
      "Aws",
      "Docker",
      "Kubernetes",
      "Microservicios",
    ],
    image: {
      url: "/img/Screenshot_3.png",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    link: "https://www.bancolombia.com/personas",
    secondary: { type: "", url: "" },
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    setIsHovered(false);
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-500 hover:border-primary/50"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Project Image */}
      <div
        className="relative h-64 overflow-hidden"
        style={
          project.image.url === ""
            ? { background: project.image.background }
            : {
                backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${project.image.url})`,
                backgroundSize: "cover",
              }
        }
      >
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />

        {/* Hover overlay */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-foreground/90 flex items-center justify-center text-background hover:scale-110 transition-transform"
          >
            <ArrowUpRight className="w-5 h-5" />
          </a>
          {project.secondary && project.secondary.type === "repo" && (
            <a
              href={project.secondary.url}
              className="w-12 h-12 rounded-full bg-foreground/90 flex items-center justify-center text-background hover:scale-110 transition-transform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.secondary && project.secondary.type === "download" && (
            <a
              href={project.secondary.url}
              target="_blank"
              className="w-12 h-12 rounded-full bg-foreground/90 flex items-center justify-center text-background hover:scale-110 transition-transform"
            >
              <Download className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium text-muted-foreground bg-secondary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 lg:py-48 bg-card/30"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            02
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Trabajo seleccionado
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Una colección de proyectos en los que he trabajado, desde
            experimentos personales hasta aplicaciones en producción.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
