"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Ease presets for consistent animations
export const eases = {
  smooth: "power3.out",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.3)",
  expo: "expo.out",
  circ: "circ.out",
}

// Hero text reveal animation
export const animateHeroText = (element: HTMLElement) => {
  const chars = element.querySelectorAll(".char")
  
  return gsap.fromTo(
    chars,
    {
      y: 100,
      opacity: 0,
      rotationX: -90,
    },
    {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 1,
      stagger: 0.03,
      ease: eases.expo,
    }
  )
}

// Fade in up animation
export const fadeInUp = (element: HTMLElement | Element, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      y: 60,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      delay,
      ease: eases.smooth,
    }
  )
}

// Stagger animation for multiple elements
export const staggerFadeInUp = (elements: HTMLElement[] | NodeListOf<Element>, stagger = 0.1) => {
  return gsap.fromTo(
    elements,
    {
      y: 60,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger,
      ease: eases.smooth,
    }
  )
}

// Scroll reveal animation
export const createScrollReveal = (element: HTMLElement | Element, options?: gsap.TweenVars) => {
  return gsap.fromTo(
    element,
    {
      y: 80,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: eases.smooth,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none reverse",
      },
      ...options,
    }
  )
}

// Parallax effect
export const createParallax = (element: HTMLElement | Element, speed = 0.5) => {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  })
}

// Line reveal animation (for underlines, dividers)
export const revealLine = (element: HTMLElement | Element) => {
  return gsap.fromTo(
    element,
    {
      scaleX: 0,
      transformOrigin: "left center",
    },
    {
      scaleX: 1,
      duration: 1.2,
      ease: eases.expo,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  )
}

// Magnetic effect for buttons/links
export const createMagneticEffect = (element: HTMLElement, strength = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: eases.smooth,
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: eases.elastic,
    })
  }
  
  element.addEventListener("mousemove", handleMouseMove)
  element.addEventListener("mouseleave", handleMouseLeave)
  
  return () => {
    element.removeEventListener("mousemove", handleMouseMove)
    element.removeEventListener("mouseleave", handleMouseLeave)
  }
}

// Text split utility
export const splitTextToChars = (text: string): string => {
  return text
    .split("")
    .map((char) => `<span class="char inline-block">${char === " " ? "&nbsp;" : char}</span>`)
    .join("")
}

// Cursor follow animation
export const createCursorFollow = (cursor: HTMLElement) => {
  const handleMouseMove = (e: MouseEvent) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      ease: eases.smooth,
    })
  }
  
  window.addEventListener("mousemove", handleMouseMove)
  
  return () => {
    window.removeEventListener("mousemove", handleMouseMove)
  }
}

// Scale on hover
export const scaleOnHover = (element: HTMLElement, scale = 1.05) => {
  const handleMouseEnter = () => {
    gsap.to(element, {
      scale,
      duration: 0.4,
      ease: eases.smooth,
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.4,
      ease: eases.smooth,
    })
  }
  
  element.addEventListener("mouseenter", handleMouseEnter)
  element.addEventListener("mouseleave", handleMouseLeave)
  
  return () => {
    element.removeEventListener("mouseenter", handleMouseEnter)
    element.removeEventListener("mouseleave", handleMouseLeave)
  }
}
