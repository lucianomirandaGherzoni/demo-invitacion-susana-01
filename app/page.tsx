"use client"

// ─── MODO COMING SOON (descomentar para ocultar la invitación) ───────────────

/* import { ComingSoon } from "@/components/coming-soon"
export default function Page() { return <ComingSoon /> } */

// ─── INVITACIÓN COMPLETA (descomentar cuando esté lista) ─────────────────────
import { useState } from "react"
import { WelcomeScreen } from "@/components/welcome-screen"
import { InvitationPage } from "@/components/invitation-page"

export default function Page() {
  const [entered, setEntered] = useState(false)

  const handleEnter = () => {
    window.scrollTo(0, 0)
    setTimeout(() => {
      setEntered(true)
    }, 50)
  }

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div
        style={{
          position: "fixed",
          inset: 0,
          opacity: entered ? 0 : 1,
          pointerEvents: entered ? "none" : "auto",
          transition: "opacity 600ms ease-in-out",
          zIndex: 50,
        }}
      >
        <WelcomeScreen onEnter={handleEnter} />
      </div>
      <InvitationPage autoPlay={entered} onBack={() => setEntered(false)} />
    </>
  )
}
