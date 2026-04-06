"use client"

import { useState } from "react"
import { WelcomeScreen } from "@/components/welcome-screen"
import { InvitationPage } from "@/components/invitation-page"

export default function Page() {
  const [entered, setEntered] = useState(false)

  const handleEnter = () => {
    setTimeout(() => {
      setEntered(true)
      setTimeout(() => {
        document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }, 50)
  }

  return (
    <>
      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Welcome screen — fixed overlay, fades out on enter */}
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

      {/* Invitation page — always in normal flow */}
      <InvitationPage autoPlay={entered} onBack={() => setEntered(false)} />
    </>
  )
}
