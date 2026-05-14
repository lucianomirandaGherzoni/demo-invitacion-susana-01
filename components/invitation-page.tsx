"use client"

import React, { useState, useEffect, useRef } from "react"
import { Plus, Minus, ArrowRight, Play, Pause } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

const WELCOME_AUDIO_SRC = "/audio/audio.mp3"

function WelcomeAudioPlayer({ autoPlay = false }: { autoPlay?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = new Audio(WELCOME_AUDIO_SRC)
    audioRef.current = audio

    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration))
    audio.addEventListener("timeupdate", () => {
      setCurrent(audio.currentTime)
      setProgress((audio.currentTime / audio.duration) * 100 || 0)
    })
    audio.addEventListener("ended", () => {
      setPlaying(false)
      setProgress(0)
      setCurrent(0)
      audio.currentTime = 0
    })

    const handleVisibility = () => {
      if (document.hidden) {
        audio.pause()
        setPlaying(false)
      }
    }
    document.addEventListener("visibilitychange", handleVisibility)

    return () => {
      audio.pause()
      audio.src = ""
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (autoPlay) {
      audio.currentTime = 0
      audio.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      audio.pause()
      audio.currentTime = 0
      setPlaying(false)
      setProgress(0)
      setCurrent(0)
    }
  }, [autoPlay])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().catch(() => {})
      setPlaying(true)
    }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audio.currentTime = ratio * duration
  }

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00"
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60).toString().padStart(2, "0")
    return `${m}:${sec}`
  }

  return (
    <div className="mt-8 flex items-center gap-4 p-4 rounded-xl border border-border bg-muted/60 backdrop-blur-sm">
      {/* Play / Pause button */}
      <button
        onClick={toggle}
        aria-label={playing ? "Pausar mensaje de bienvenida" : "Reproducir mensaje de bienvenida"}
        className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors duration-300 cursor-pointer"
      >
        {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="translate-x-px" />}
      </button>

      {/* Label + bar */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-muted-foreground mb-2 truncate">
          <span className="md:hidden">Mensaje de Bienvenida</span>
          <span className="hidden md:inline">Mensaje de Bienvenida — Susana Majul</span>
        </p>
        {/* Progress track */}
        <div
          ref={progressRef}
          onClick={seek}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="relative h-[3px] bg-border rounded-full cursor-pointer group"
        >
          <div
            className="absolute left-0 top-0 h-full bg-accent rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
          {/* Scrubber thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-1/2"
            style={{ left: `${progress}%` }}
          />
        </div>
      </div>

      {/* Time */}
      <span className="shrink-0 font-sans text-[11px] tabular-nums text-muted-foreground">
        {fmt(current)}&thinsp;/&thinsp;{fmt(duration)}
      </span>
    </div>
  )
}

const faqs = [
  {
    q: "¿Cómo accedo al seminario online?",
    a: "Recibirás un enlace privado de alta definición a través de tu correo y WhatsApp una hora antes del inicio el 3 de Mayo.",
  },
  {
    q: "¿Se requiere experiencia previa en meditación?",
    a: "No es necesaria. La frecuencia de Metatrón guía el proceso de forma natural, adaptándose a la apertura de cada participante.",
  },
  {
    q: "¿Podré ver la grabación después?",
    a: "Sí, todos los inscritos tendrán acceso a la grabación y al taller de regalo por 12 meses.",
  },
]

const navLinks = [
  { label: "Bienvenida", href: "#welcome" },
  { label: "Invitación", href: "#invitation" },
]

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-5 py-7 md:py-9">
      <div className="flex-1 h-px bg-border" />
      <span className="font-sans text-[10px] uppercase tracking-[0.45em] text-primary/60 shrink-0">{label}</span>
    </div>
  )
}

export function InvitationPage({ autoPlay = false, onBack }: { autoPlay?: boolean; onBack?: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState("invitation")
  const [scrolled, setScrolled] = useState(false)

  const fadeStyle = (delay: number): React.CSSProperties => ({
    opacity: autoPlay ? 1 : 0,
    transform: autoPlay ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
  })

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ["invitation", "contenido"]
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (href: string) => {
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 160
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  const handleNavClick = (href: string) => {
    if (href === "#welcome") {
      onBack?.()
    } else {
      scrollTo(href)
    }
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Top nav */}
      <nav
        className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl transition-all duration-300"
        style={{ borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent", ...fadeStyle(0) }}
      >
        <div className="flex items-center justify-between px-4 md:px-12 py-5 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-bombones-para-el-alma.png" alt="Bombones para el Alma" className="h-10 w-10 object-contain self-center -translate-y-[3px]" />
            <span className="font-serif text-xl tracking-[0.18em] text-primary uppercase self-center leading-none">
              Susana Majul
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "")
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`font-sans text-[11px] uppercase tracking-[0.3em] transition-colors duration-200 pb-0.5 cursor-pointer ${
                    isActive
                      ? "text-accent font-medium border-b border-accent"
                      : "text-muted-foreground hover:text-primary border-b border-transparent"
                  }`}
                >
                  {link.label}
                </button>
              )
            })}
          </div>
          <div className="w-24 hidden md:block" />
        </div>
      </nav>

      <main className="px-4 md:px-12 max-w-7xl mx-auto">

        {/* ── Section separators ── */}
        <div style={fadeStyle(60)}>
          <SectionDivider label="INVITACIÓN" />
        </div>

        {/* ── Hero section ── */}
        <section id="invitation" className="pb-14 md:pb-20 xl:pb-28 lg:[zoom:0.8] xl:[zoom:1]">

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6 lg:hidden" style={fadeStyle(100)}>
            <div className="w-12 h-12 rounded-full overflow-hidden border border-border shadow-sm shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/avatar.png" alt="Susana Majul" className="w-full h-full object-cover" />
            </div>
            <span className="flex flex-col font-sans text-[10px] uppercase tracking-[0.4em] text-accent">
              <span>Susana Majul</span>
              <span>Bombones para el Alma</span>
            </span>
          </div>

          {/* Two-column layout — title left, image right, compact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 xl:gap-12 items-center">

            {/* Left: headline + meta + body */}
            <div style={fadeStyle(150)}>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-[1.1] tracking-tight text-primary mb-5 xl:mb-6 text-balance">
                MI NUEVO YO<br />
                <em className="italic font-light">Apertura de Registros Akásicos</em><br />
                <span className="text-[0.75em]">para nuevos Contratos de Vida</span>
              </h1>

              <p className="font-sans text-[16px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] leading-relaxed text-muted-foreground font-light w-[90%] mb-4">
                Enseñaremos el método de Apertura de Registros Akásicos y la forma
                de detectar la información relevante con la cual crearemos los
                nuevos contratos. Cada ser genera un plan de vida antes de su
                ingreso al planeta, con vivencias para lograr sabiduría y evolución.
              </p>

              <p className="font-sans text-[0.8rem] md:text-sm uppercase tracking-[0.1em] text-accent mb-6 mt-4">
                Maestría del Poder · 21 de Junio de 2026
              </p>

              {/* Horarios por zona horaria */}
              <div className="mt-4 lg:mt-5 xl:mt-6 grid grid-cols-2 gap-x-6 gap-y-1 lg:gap-y-1.5">
                {[
                  ["07:00 AM", "Los Ángeles"],
                  ["08:00 AM", "México / Centroamérica"],
                  ["09:00 AM", "Bogotá / Ecuador / Perú"],
                  ["10:00 AM", "Miami / Venezuela / Santiago"],
                  ["11:00 AM", "Buenos Aires / Uruguay"],
                  ["03:00 PM", "Londres"],
                  ["04:00 PM", "Madrid / París / Roma"],
                  ["00:00 AM", "Australia (22 Jun)"],
                ].map(([time, zone]) => (
                  <div key={zone} className="flex items-baseline gap-2">
                    <span className="font-sans text-[11px] tabular-nums font-medium text-primary shrink-0">{time}</span>
                    <span className="font-sans text-[10px] lg:text-[13px] text-muted-foreground/70 leading-snug">{zone}</span>
                  </div>
                ))}
              </div>

              {/* Welcome audio message */}
              <WelcomeAudioPlayer autoPlay={autoPlay} />
            </div>

            {/* Right: compact image pair */}
            <div className="grid grid-cols-2 gap-4" style={fadeStyle(220)}>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/susi-nueva.webp"
                  alt="Susana Majul"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mt-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/imagen-4.webp"
                  alt="Registros Akásicos"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Pull quote ── */}
        <FadeIn>
          <div className="max-w-xl lg:max-w-2xl mx-auto px-4 py-10 md:py-16 text-center">
            <div className="w-8 h-px bg-border mb-8 mx-auto" />
            <p className="font-serif text-lg md:text-xl lg:text-2xl leading-[1.7] text-primary/60 font-light">
              Cada <em className="italic font-medium">ser</em> antes de su ingreso al planeta genera un{" "}
              <em className="italic font-medium">plan de vida</em> con ciertas condiciones de aprendizaje
              y determinadas vivencias a cumplir para lograr sabiduría y evolución.
            </p>
            <div className="w-8 h-px bg-border mt-8 mx-auto" />
          </div>
        </FadeIn>

        {/* ── Section separator ── */}
        <FadeIn>
          <SectionDivider label="CONTENIDO" />
        </FadeIn>

        {/* ── Gift / exclusive content section ── */}
        <FadeIn>
        <section id="contenido" className="mb-24 md:mb-32">
          <div className="bg-primary rounded-3xl p-8 md:p-16 overflow-hidden relative">
            {/* Subtle grain */}
            <div
              className="absolute inset-0 rounded-3xl opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Text */}
              <div>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 italic text-white">
                  Los Tres Nuevos Contratos
                </h2>
                <p className="font-sans text-white/80 text-base font-light leading-relaxed mb-6">
                  A través de la Apertura de Registros llevamos conciencia y luz
                  a todos tus propósitos. En el seminario confeccionaremos:
                </p>
                <ul className="space-y-3">
                  {["Contrato de Longevidad", "Contrato de Relaciones", "Contrato de Conexión Divina"].map((c) => (
                    <li key={c} className="flex items-center gap-2 font-sans text-white/90 text-sm tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/imagen-1.webp"
                    alt="Registros Akásicos"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden mt-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/imagen-3.webp"
                    alt="Apertura de Registros"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        </FadeIn>

        {/* ── Taller de Regalo ── */}
        <FadeIn delay={100}>
          <SectionDivider label="INCLUIDO EN TU INSCRIPCIÓN" />
        </FadeIn>
        <FadeIn delay={100}>
        <section className="max-w-5xl mx-auto px-4 md:px-12 pt-4 pb-16 md:pt-6 md:pb-20">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-primary mb-8">
            <span className="text-accent font-light">+</span> Taller de Regalo:<br />
            <em className="italic font-light">Activación del Sistema<br className="md:hidden" /> Inmune</em>
          </h2>
          <div className="flex flex-wrap gap-4">
            {/* Card 1 — TIMO */}
            <div className="w-full md:w-auto border border-border/50 rounded-2xl px-6 py-6 flex flex-row items-center gap-5">
              <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
                Enfoque y restauración del <strong className="text-primary font-medium">TIMO</strong>
              </p>
            </div>
            {/* Card 2 — Médula Ósea y Sistema Linfático */}
            <div className="w-full md:w-auto border border-border/50 rounded-2xl px-6 py-6 flex flex-row items-center gap-5">
              <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
                <strong className="text-primary font-medium">Médula Ósea</strong> y <strong className="text-primary font-medium">Sistema Linfático</strong>
              </p>
            </div>
            {/* Card 3 — Hábitos */}
            <div className="w-full md:w-auto border border-border/50 rounded-2xl px-6 py-6 flex flex-row items-center gap-5">
              <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
                Sugerencias de <strong className="text-primary font-medium">Hábitos</strong>
              </p>
            </div>
          </div>
        </section>
        </FadeIn>

        {/* ── Consultas comunes — desactivado — */}
        {false && (
          <>
            <SectionDivider label="EXPERIENCIA" />
            <section id="consultas" className="mb-24 md:mb-32 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-secondary mb-4 block">
              Consultas Comunes
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary">
              Detalles de la Experiencia
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-muted rounded-2xl overflow-hidden border border-border/40"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left group"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-serif text-lg md:text-xl text-primary pr-4 leading-snug">
                    {faq.q}
                  </span>
                  <span className="shrink-0 text-secondary group-hover:text-accent transition-colors duration-200">
                    {openFaq === i ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </span>
                </button>
                <div
                  className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === i ? "max-h-48 pb-7 opacity-100" : "max-h-0 pb-0 opacity-0"
                  }`}
                >
                  <p className="font-sans text-muted-foreground font-light leading-relaxed text-base">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
          </>
        )}
      </main>

      {/* Inscription FAB — bottom-right */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40">
        <a
          href="https://wa.me/542944151575?text=Hola!%20Me%20interesa%20el%20Seminario%20MI%20NUEVO%20YO%2C%20%C2%BFc%C3%B3mo%20me%20inscribo%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-3.5 shadow-[0_8px_40px_rgba(0,31,63,0.22)] hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] whitespace-nowrap">
            Reservar mi lugar
          </span>
        </a>
      </div>

      {/* Footer */}
      <footer className="px-4 md:px-12 py-8 pb-28 md:pb-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-bombones-para-el-alma.png" alt="Bombones para el Alma" className="h-10 w-10 object-contain self-center -translate-y-[3px]" />
          <span className="font-serif text-sm tracking-[0.15em] text-primary self-center leading-snug">
            <span className="block">SUSANA MAJUL</span>
            <span className="block md:hidden">BOMBONES PARA EL ALMA</span>
            <span className="hidden md:inline">BOMBONES PARA EL ALMA</span>
          </span>
        </div>
      </footer>
    </div>
  )
}
