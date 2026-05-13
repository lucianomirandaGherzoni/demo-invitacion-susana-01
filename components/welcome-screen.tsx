"use client"

interface WelcomeScreenProps {
  onEnter: () => void
}

export function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  return (
    <div className="relative min-h-screen bg-background flex flex-col">
      {/* Top nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 z-20 relative">
        <span className="font-serif text-lg md:text-xl tracking-[0.18em] text-primary uppercase">
          Susana Majul
        </span>
        <div className="hidden md:flex items-center gap-10">
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-accent font-semibold border-b border-accent pb-0.5 cursor-default">
            Bienvenida
          </span>
          <span
            onClick={onEnter}
            className="font-sans text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary cursor-pointer transition-colors duration-200"
          >
            Invitación
          </span>
          <span
            onClick={onEnter}
            className="font-sans text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary cursor-pointer transition-colors duration-200"
          >
            Consultas comunes
          </span>
        </div>
        <div className="w-24 hidden md:block" />
      </nav>

      {/* Hero */}
      <main className="flex-1 flex items-center px-6 md:px-12 py-8 md:py-6 relative z-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14 items-center max-w-7xl mx-auto">

          {/* Image column — on mobile first, smaller height */}
          <div className="order-1 lg:order-2 relative">
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-xl"
              style={{ height: "clamp(200px, 30vw, 480px)" }}
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

          {/* Text column */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-border shadow-sm shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/avatar.png" alt="Susana Majul" className="w-full h-full object-cover" />
              </div>
              <span className="flex flex-col font-sans text-[10px] uppercase tracking-[0.4em] text-accent">
                <span>Susana Majul</span>
                <span>— Bombones para el Alma</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl lg:text-[3.25rem] xl:text-6xl text-primary leading-[1.08] tracking-tight mb-4 text-balance">
              Seminario Online:{" "}
              <em className="italic font-light">
                Liberación de todos los miedos
              </em>
            </h1>

            <p className="font-sans text-[15px] text-muted-foreground max-w-xs mb-7 leading-relaxed">
              Un viaje hacia la claridad. Encuentra la paz interior a través de
              la sabiduría ancestral y la presencia consciente.
            </p>

            <button
              onClick={onEnter}
              className="group inline-flex items-center gap-4 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-sans text-[11px] uppercase tracking-[0.25em] w-fit hover:bg-accent hover:text-accent-foreground transition-all duration-500 ease-in-out cursor-pointer"
            >
              Ingresar
            </button>

            <div className="mt-5 w-12 h-px bg-border" />
          </div>

        </div>
      </main>

    </div>
  )
}
