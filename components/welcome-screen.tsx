"use client"

import { useEffect, useState } from "react"

interface WelcomeScreenProps {
  onEnter: () => void
}

export function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const fadeStyle = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      {/* Top nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-3 z-20 relative" style={fadeStyle(0)}>
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-bombones-para-el-alma.png" alt="Bombones para el Alma" className="h-10 w-10 object-contain self-center -translate-y-[3px]" />
          <span className="font-serif text-lg md:text-xl tracking-[0.18em] text-primary uppercase self-center leading-none">
            Susana Majul
          </span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold border-b border-accent pb-0.5 cursor-pointer">
            Bienvenida
          </span>
          <span
            onClick={onEnter}
            className="font-sans text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary cursor-pointer transition-colors duration-200"
          >
            Invitación
          </span>
        </div>
        <div className="w-24 hidden md:block" />
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6 md:px-12 pt-2 md:pt-12 pb-0 relative z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14 items-center justify-center max-w-7xl mx-auto">

          {/* Image column — visible en todos los tamaños */}
          <div className="order-1 lg:order-2 relative flex justify-center" style={fadeStyle(150)}>
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] w-[min(90vw,340px)] lg:w-[min(36vw,520px)] lg:h-[440px] xl:w-[min(32vw,600px)] xl:h-[540px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/imagen-1.webp"
                alt="Susana Majul, facilitadora del seminario"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
            </div>

            {/* Floating quote card */}
            <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm px-5 py-4 rounded-xl shadow-lg max-w-[220px] hidden md:block border border-border/50">
              <p className="font-serif italic text-primary text-[13px] leading-snug">
                &ldquo;Cuando cambias tu historia interior, tu realidad exterior no puede quedarse igual.&rdquo;
              </p>
            </div>
          </div>

          {/* Text column */}
          <div className="flex flex-col justify-center order-2 lg:order-1" style={fadeStyle(80)}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-border shadow-sm shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/avatar.png" alt="Susana Majul" className="w-full h-full object-cover" />
              </div>
              <span className="flex flex-col font-sans text-[13px] md:text-[15px] uppercase tracking-[0.4em] text-accent">
                <span>Susana Majul</span>
                <span>Bombones para el Alma</span>
              </span>
            </div>

            <h1 className="font-serif text-primary leading-[1.08] tracking-tight mb-2 text-balance text-[2.2rem] md:text-4xl lg:text-5xl xl:text-6xl">
              Seminario Online:{" "}
              <em className="italic font-light">
                MI NUEVO YO
              </em>
            </h1>

            <p className="font-sans text-[0.8rem] md:text-[13px] lg:text-[14px] xl:text-[15px] uppercase tracking-[0.1em] text-accent mb-2">
              Maestría del Poder · 21 de Junio de 2026
            </p>

            <p className="font-sans text-[15px] text-muted-foreground max-w-xs mb-4 leading-relaxed hidden md:block">
              Apertura de Registros Akásicos<br />
              para nuevos Contratos de Vida.
            </p>

            <button
              onClick={onEnter}
              className="group inline-flex items-center gap-4 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-sans text-[11px] uppercase tracking-[0.25em] w-fit hover:bg-accent hover:text-accent-foreground transition-all duration-500 ease-in-out cursor-pointer mt-2"
            >
              Ingresar
            </button>

          </div>

        </div>
      </main>

    </div>
  )
}
