"use client"

import { useEffect, useRef, useState } from "react"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number // ms
}

export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Ensure the invisible state is painted before observing
    const raf = requestAnimationFrame(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay)
            observer.disconnect()
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
      )
      observer.observe(el)

      return () => observer.disconnect()
    })

    return () => cancelAnimationFrame(raf)
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.75s ease, transform 0.75s ease",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}
