import { useEffect, useState } from 'react'

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Disable listener on touch screens to save cycles
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize values between -0.5 and 0.5 relative to screen size
      const x = (e.clientX / window.innerWidth) - 0.5
      const y = (e.clientY / window.innerHeight) - 0.5
      setPosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return position
}
