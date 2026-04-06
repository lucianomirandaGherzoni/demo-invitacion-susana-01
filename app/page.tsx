"use client"

import { useState, useEffect } from "react"
import { WelcomeScreen } from "@/components/welcome-screen"
import { InvitationPage } from "@/components/invitation-page"
import { MusicPlayer } from "@/components/music-player"

export default function Page() {
  const [entered, setEntered] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)

  // Lock body scroll while welcome screen is showing
  useEffect(() => {
    if (!entered) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [entered])

  const handleEnter = () => {
    setMusicStarted(true)
    setTimeout(() => setEntered(true), 50)
  }

  return (
    <>
      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Welcome screen — fades out */}
      <div
        style={{
          position: entered ? "fixed" : "relative",
          inset: 0,
          opacity: entered ? 0 : 1,
          pointerEvents: entered ? "none" : "auto",
          transition: "opacity 600ms ease-in-out",
          zIndex: entered ? 10 : "auto",
        }}
      >
        <WelcomeScreen onEnter={handleEnter} />
      </div>

      {/* Invitation page — fades in */}
      <div
        style={{
          opacity: entered ? 1 : 0,
          transition: "opacity 700ms ease-in-out 300ms",
          pointerEvents: entered ? "auto" : "none",
          minHeight: "100vh",
          visibility: entered ? "visible" : "hidden",
        }}
      >
        <InvitationPage />
      </div>

      {/* Floating music player */}
      <MusicPlayer autoPlay={musicStarted} />
    </>
  )
}
