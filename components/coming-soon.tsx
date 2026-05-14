"use client"

import { useEffect, useState } from "react"

export function ComingSoon() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "#FAF9F7" }}
    >
      <div
        className="flex flex-col items-center text-center gap-6"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden border border-border shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/avatar.png" alt="Susana Majul" className="w-full h-full object-cover" />
        </div>

        {/* Brand */}
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-accent flex flex-col items-center gap-0.5">
          <span>Susana Majul</span>
          <span>Bombones para el Alma</span>
        </span>

        {/* Separator */}
        <div className="w-16 h-px bg-border" />

        {/* Headline */}
        <h1 className="font-serif text-3xl md:text-5xl text-primary leading-tight text-balance">
          Algo nuevo está por llegar.
        </h1>

        {/* Body */}
        <p className="font-sans text-[14px] text-muted-foreground max-w-xs leading-relaxed">
          Estamos preparando la próxima invitación.
        </p>
      </div>
    </div>
  )
}
