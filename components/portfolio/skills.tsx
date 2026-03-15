"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Languages",
    skills: [
      "TypeScript",
      "JavaScript",
      "Java",
      "Elixir",
      "Php",
      "SQL",
      "NoSQL",
    ],
  },
  {
    title: "Frameworks",
    skills: [
      "Spring Boot",
      "WebFlux",
      "Node.js",
      "AdoniJs",
      "NestJs",
      "Express",
      "Angular",
      "Next.js",
    ],
  },
  {
    title: "Tools",
    skills: [
      "Git",
      "Postman",
      "VS Code",
      "Docker",
      "Intellij",
      "AWS",
      "Google Cloud",
      "RabbitMQ",
      "Kubernetes",
      "Azure DevOps",
    ],
  },
  {
    title: "Other",
    skills: [
      "REST APIs",
      "Testing",
      "CI/CD",
      "Solid",
      "Clean Architecture",
      "Microservices",
      "Scrum",
    ],
  },
];

function SkillBadge({ skill, index }: { skill: string; index: number }) {
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const badge = badgeRef.current;
    if (!badge) return;

    const handleMouseEnter = () => {
      gsap.to(badge, {
        scale: 1.05,
        y: -4,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(badge, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    badge.addEventListener("mouseenter", handleMouseEnter);
    badge.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      badge.removeEventListener("mouseenter", handleMouseEnter);
      badge.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <span
      ref={badgeRef}
      className="skill-badge inline-block px-4 py-2 text-sm font-medium text-foreground bg-secondary/50 border border-border rounded-full cursor-default hover:border-primary/50 hover:bg-primary/10 transition-colors"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {skill}
    </span>
  );
}

function SkillCategory({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) {
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const element = categoryRef.current;
      if (!element) return;

      gsap.fromTo(
        element,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Stagger badges
      const badges = element.querySelectorAll(".skill-badge");
      gsap.fromTo(
        badges,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, categoryRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={categoryRef} className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">{category.title}</h3>
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, i) => (
          <SkillBadge key={skill} skill={skill} index={i} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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

      // Marquee animation
      if (marqueeRef.current) {
        const marquee = marqueeRef.current;
        gsap.to(marquee.querySelector(".marquee-content"), {
          xPercent: -50,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headingRef} className="mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            03
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Habilidades & Herramientas
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Tecnologías y herramientas que utilizo para dar vida a las ideas.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="mt-24 overflow-hidden border-y border-border py-6"
      >
        <div className="marquee-content flex gap-8 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-600">
                Java
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary/40">
                ·
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-600">
                Spring boot
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary/40">
                ·
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-600">
                Web Flux
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary/40">
                ·
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-600">
                TypeScript
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary/40">
                ·
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-600">
                Node.js
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary/40">
                ·
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-600">
                NestJs
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary/40">
                ·
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-600">
                React
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary/40">
                ·
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-600">
                AWS
              </span>
              <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary/40">
                ·
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
