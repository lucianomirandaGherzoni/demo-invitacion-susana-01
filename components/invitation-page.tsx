"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, Minus, ArrowRight, Play, Pause } from "lucide-react"

const WELCOME_AUDIO_SRC = "/audio/audio-web.ogg"

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

    return () => {
      audio.pause()
      audio.src = ""
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
        className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
      >
        {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="translate-x-px" />}
      </button>

      {/* Label + bar */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 truncate">
          Mensaje de Bienvenida — Susana Majul
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
  { label: "Consultas comunes", href: "#consultas" },
]

export function InvitationPage({ autoPlay = false, onBack }: { autoPlay?: boolean; onBack?: () => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState("invitation")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ["invitation", "contenido", "consultas"]
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
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
        style={{ borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent" }}
      >
        <div className="flex items-center justify-between px-4 md:px-12 py-5 max-w-7xl mx-auto">
          <span className="font-serif text-xl tracking-[0.18em] text-primary uppercase">
            Susana Majul
          </span>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "")
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`font-sans text-[11px] uppercase tracking-[0.3em] transition-colors duration-200 pb-0.5 ${
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

        {/* ── Hero section ── */}
        <section id="invitation" className="pt-14 md:pt-20 pb-20 md:pb-28">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-10">
            <span className="flex flex-col font-sans text-[10px] uppercase tracking-[0.4em] text-accent mb-2.5">
              <span>Susana Majul</span>
              <span>— Bombones para el Alma</span>
            </span>
          </div>

          {/* Two-column layout — title left, image right, compact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: headline + meta + body */}
            <div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-primary mb-6 text-balance">
                Liberación de <em className="italic font-light">miedos</em>{" "}
                y sabiduría interna
              </h1>

              <p className="font-sans text-sm uppercase tracking-[0.25em] text-accent mb-6">
                3 de Mayo de 2026
              </p>

              <div className="w-10 h-px bg-border mb-6" />

              <p className="font-sans text-[15px] leading-relaxed text-muted-foreground font-light max-w-md">
                Una travesía espiritual profunda bajo la guía del Arcángel
                Metatrón. Diseñado para desmantelar las estructuras del miedo
                y reconectar con la esencia divina que reside en tu interior.
              </p>

              {/* Quote callout */}
              <blockquote className="mt-8 pl-5 border-l-2 border-accent">
                <p className="font-serif italic text-lg text-primary/70 leading-snug">
                  &ldquo;El miedo es la ausencia del amor.<br />
                  El amor es la presencia de todo.&rdquo;
                </p>
              </blockquote>

              {/* Welcome audio message */}
              <WelcomeAudioPlayer autoPlay={autoPlay} />
            </div>

            {/* Right: compact image pair */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/zen-stones.jpg"
                  alt="Piedras zen en equilibrio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mt-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/herbs-texture.jpg"
                  alt="Hierbas ceremoniales"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-border mb-24 md:mb-32" />

        {/* ── Gift / exclusive content section ── */}
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

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/70 mb-4 block">
                  Contenido Exclusivo
                </span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 italic text-white">
                  + Taller de Regalo: Sanación profunda del sistema digestivo
                </h2>
                <p className="font-sans text-white/80 text-base font-light leading-relaxed">
                  Una masterclass enfocada en liberar memorias dolorosas alojadas
                  en tu centro de procesamiento emocional, permitiendo una
                  integración armoniosa de tus experiencias de vida.
                </p>
              </div>

              {/* Image grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/forest-mist.jpg"
                    alt="Bosque en la neblina"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden mt-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/herbs-texture.jpg"
                    alt="Hierbas ceremoniales"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="w-full h-px bg-border mb-24 md:mb-32" />

        {/* ── FAQ section ── */}
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
      </main>

      {/* Inscription FAB — bottom-right */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40">
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-primary text-primary-foreground rounded-full px-6 py-3.5 shadow-[0_8px_40px_rgba(0,31,63,0.22)] hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] whitespace-nowrap">
            Quiero inscribirme
          </span>
          <ArrowRight size={13} className="shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>

      {/* Footer */}
      <footer className="px-4 md:px-12 py-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-serif text-sm tracking-[0.15em] text-primary">
              SUSANA MAJUL
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
              MMXXVI
            </span>
          </div>
          <div className="flex gap-8">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
              Inquiries
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
              Privacy
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
              Terms
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
