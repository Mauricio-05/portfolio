"use client"

import {
  Navbar,
  Hero,
  About,
  Projects,
  Skills,
  Contact,
  Footer,
  CustomCursor,
  SmoothScroll,
} from "@/components/portfolio"

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
