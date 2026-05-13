"use client"

// ─── MODO DEPLOY ────────────────────────────────────────────────────────────
// Mostrando pantalla "próximamente". Para volver a la invitación completa,
// comentá la línea de ComingSoon y descomentá el bloque de abajo.
import { ComingSoon } from "@/components/coming-soon"

export default function Page() {
  return <ComingSoon />
}

// ─── INVITACIÓN COMPLETA (descomentar cuando esté lista) ─────────────────────
// "use client"
// import { useState } from "react"
// import { WelcomeScreen } from "@/components/welcome-screen"
// import { InvitationPage } from "@/components/invitation-page"
//
// export default function Page() {
//   const [entered, setEntered] = useState(false)
//
//   const handleEnter = () => {
//     setTimeout(() => {
//       setEntered(true)
//       setTimeout(() => {
//         document.getElementById("invitation")?.scrollIntoView({ behavior: "smooth", block: "start" })
//       }, 100)
//     }, 50)
//   }
//
//   return (
//     <>
//       <div className="grain" aria-hidden="true" />
//       <div
//         style={{
//           position: "fixed",
//           inset: 0,
//           opacity: entered ? 0 : 1,
//           pointerEvents: entered ? "none" : "auto",
//           transition: "opacity 600ms ease-in-out",
//           zIndex: 50,
//         }}
//       >
//         <WelcomeScreen onEnter={handleEnter} />
//       </div>
//       <InvitationPage autoPlay={entered} onBack={() => setEntered(false)} />
//     </>
//   )
// }
