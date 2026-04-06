"use client"

import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"

interface MusicPlayerProps {
  autoPlay?: boolean
}

// Reliable royalty-free ambient music from Wikimedia Commons
const TRACKS = [
  "https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543_fugue.ogg",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
]

export function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const startedRef = useRef(false)

  useEffect(() => {
    // Create audio element inline so we can control it
    const audio = document.createElement("audio")
    audio.loop = true
    audio.volume = 0.3
    // Use a reliable ambient/calm track
    audio.src =
      "https://www.bensound.com/bensound-music/bensound-relaxing.mp3"
    audioRef.current = audio

    audio.addEventListener("error", () => {
      // fallback: silence — don't crash
      console.log("[v0] Audio load error, trying fallback")
    })

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  // Trigger play when autoPlay flips to true (only once)
  useEffect(() => {
    if (!autoPlay || startedRef.current) return
    startedRef.current = true
    setVisible(true)

    const audio = audioRef.current
    if (!audio) return

    const tryPlay = () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log("[v0] Autoplay blocked:", err.message)
          setIsPlaying(false)
        })
    }

    // Small delay so gesture context from the button click carries over
    setTimeout(tryPlay, 100)
  }, [autoPlay])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch((err) => console.log("[v0] Play error:", err.message))
      setIsPlaying(true)
    }
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 group">
      <button
        onClick={toggle}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        className="relative w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-[0_4px_24px_rgba(0,31,63,0.22)] hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center justify-center shrink-0"
      >
        {isPlaying ? (
          <Pause size={15} />
        ) : (
          <Play size={15} className="translate-x-px" />
        )}
        {/* Pulse ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-primary/25 animate-ping" />
        )}
      </button>

      {/* Label — shows on group hover */}
      <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none">
        {isPlaying ? "Pausar" : "Reproducir"}
      </span>
    </div>
  )
}
