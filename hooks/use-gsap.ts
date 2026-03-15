"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function useGsapContext() {
  const ref = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {}, ref)
    return () => ctx.revert()
  }, [])
  
  return ref
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options?: gsap.TweenVars) {
  const ref = useRef<T>(null)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const animation = gsap.fromTo(
      element,
      {
        y: 80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
        ...options,
      }
    )
    
    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [options])
  
  return ref
}

export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  itemSelector: string,
  stagger = 0.1
) {
  const ref = useRef<T>(null)
  
  useEffect(() => {
    const container = ref.current
    if (!container) return
    
    const items = container.querySelectorAll(itemSelector)
    
    const animation = gsap.fromTo(
      items,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )
    
    return () => {
      animation.kill()
    }
  }, [itemSelector, stagger])
  
  return ref
}

export function useMagneticEffect<T extends HTMLElement = HTMLDivElement>(strength = 0.3) {
  const ref = useRef<T>(null)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
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
        ease: "power3.out",
      })
    }
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      })
    }
    
    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)
    
    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength])
  
  return ref
}

export function useTextReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const chars = element.querySelectorAll(".char")
    
    gsap.fromTo(
      chars,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.02,
        ease: "expo.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, [])
  
  return ref
}
