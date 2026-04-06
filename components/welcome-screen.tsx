"use client"

import { ArrowRight } from "lucide-react"

interface WelcomeScreenProps {
  onEnter: () => void
}

export function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  return (
    <div className="relative h-screen bg-background overflow-hidden flex flex-col">
      {/* Top nav */}
      <nav className="flex items-center justify-between px-8 md:px-12 py-6 z-20 relative">
        <span className="font-serif text-xl tracking-[0.18em] text-primary uppercase">
          Seminar
        </span>
        <div className="hidden md:flex items-center gap-10">
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold border-b border-accent pb-0.5 cursor-default">
            Bienvenida
          </span>
          <span
            onClick={onEnter}
            className="font-sans text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary cursor-pointer transition-colors duration-200"
          >
            Contenido
          </span>
          <span
            onClick={onEnter}
            className="font-sans text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary cursor-pointer transition-colors duration-200"
          >
            Recursos
          </span>
        </div>
        <div className="w-24 hidden md:block" />
      </nav>

      {/* Hero — fills remaining height between nav and footer */}
      <main className="flex-1 flex items-center px-8 md:px-12 py-6 relative z-10 min-h-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center max-w-7xl mx-auto">

          {/* Text column */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <span className="inline-flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.4em] text-accent mb-7">
              <span className="w-6 h-px bg-accent" />
              Susana Majul — Bombones para el Alma
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl text-primary leading-[1.08] tracking-tight mb-5 text-balance">
              Seminario Online:{" "}
              <em className="italic font-light">
                Liberación de todos los miedos
              </em>
            </h1>

            <p className="font-sans text-[15px] text-muted-foreground max-w-xs mb-8 leading-relaxed">
              Un viaje hacia la claridad. Encuentra la paz interior a través de
              la sabiduría ancestral y la presencia consciente.
            </p>

            <button
              onClick={onEnter}
              className="group inline-flex items-center gap-4 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-sans text-[11px] uppercase tracking-[0.25em] w-fit hover:bg-accent hover:text-accent-foreground transition-all duration-500 ease-in-out"
            >
              Ingresar
              <ArrowRight
                size={13}
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </button>

            <div className="mt-5 w-12 h-px bg-border" />
          </div>

          {/* Image column — fixed max height so it never overflows the viewport */}
          <div className="order-1 lg:order-2 relative">
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-xl"
              style={{ height: "clamp(280px, 52vh, 520px)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/susana-portrait.jpg"
                alt="Susana Majul, facilitadora del seminario"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
            </div>

            {/* Floating quote card */}
            <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm px-5 py-4 rounded-xl shadow-lg max-w-[220px] hidden md:block border border-border/50">
              <p className="font-sans text-[8px] uppercase tracking-[0.3em] text-secondary mb-1.5">
                Edición Limitada
              </p>
              <p className="font-serif italic text-primary text-[13px] leading-snug">
                &ldquo;El miedo es la ausencia de amor. El amor es la presencia de todo.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}
