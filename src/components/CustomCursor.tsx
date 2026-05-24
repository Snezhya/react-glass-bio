import React, { useEffect, useRef } from 'react'
import { useDeviceDetect } from '../hooks/useDeviceDetect'

export const CustomCursor: React.FC = () => {
  const { isTouch } = useDeviceDetect()
  
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  
  const mouseRef = useRef({ x: 0, y: 0 })
  const ringRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Hide if mobile or touch interface is active
    if (isTouch) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const updateRingPosition = () => {
      // Linear interpolation (lerp) for soft lag physics
      const ease = 0.12
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * ease
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * ease

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringRef.current.x}px, ${ringRef.current.y}px, 0)`
      }

      requestAnimationFrame(updateRingPosition)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    const animationFrameId = requestAnimationFrame(updateRingPosition)

    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      document.body.style.cursor = 'auto'
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      {/* Centered Small Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-screen transition-transform duration-[0.05s] ease-out"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
      {/* Surrounding Glowing Aura Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-cyan-400/30 bg-cyan-400/[0.03] pointer-events-none z-[9998] mix-blend-screen shadow-[0_0_12px_rgba(0,255,204,0.15)]"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  )
}
