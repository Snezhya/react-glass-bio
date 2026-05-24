import React, { useState, useRef } from 'react'
import { useDeviceDetect } from '../hooks/useDeviceDetect'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hoverGlow?: string
  noTilt?: boolean
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverGlow = '',
  noTilt = false,
}) => {
  const { isTouch } = useDeviceDetect()
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Transform and reflection styles
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
  const [reflectionStyle, setReflectionStyle] = useState({ opacity: 0, x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || noTilt || !cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    
    // Relative mouse coordinates from 0 to width/height
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Normalized coordinates (-0.5 to 0.5)
    const normalizedX = (x / rect.width) - 0.5
    const normalizedY = (y / rect.height) - 0.5
    
    // Rotations (max 6 degrees tilt)
    const rotateX = -normalizedY * 8
    const rotateY = normalizedX * 8
    
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
    
    // Shine reflection coordinates
    setReflectionStyle({
      opacity: 1,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    })
  }

  const handleMouseLeave = () => {
    if (isTouch || noTilt) return
    
    // Reset back to initial identity matrix smoothly
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setReflectionStyle(prev => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel rounded-3xl p-6 relative overflow-hidden gpu-accel transition-all duration-300 ease-out select-none ${className}`}
      style={{
        transform: isTouch ? 'none' : transformStyle,
        '--hover-glow': hoverGlow,
      } as React.CSSProperties}
    >
      {/* Dynamic light reflection sweep overlay (Desktop only) */}
      {!isTouch && !noTilt && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-500 bg-radial from-white/10 to-transparent"
          style={{
            opacity: reflectionStyle.opacity,
            background: `radial-gradient(circle 120px at ${reflectionStyle.x}% ${reflectionStyle.y}%, rgba(255, 255, 255, 0.15) 0%, transparent 100%)`,
          }}
        />
      )}

      {/* Inner visual elements */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}
