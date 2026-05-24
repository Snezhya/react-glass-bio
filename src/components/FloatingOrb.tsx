import React from 'react'

interface FloatingOrbProps {
  color: string
  size: string
  mobileSize?: string
  top: string
  left: string
  duration: number
  delay?: number
  index?: number
}

export const FloatingOrb: React.FC<FloatingOrbProps> = ({
  color,
  size,
  mobileSize = '150px',
  top,
  left,
  duration,
  delay = 0,
}) => {
  return (
    <div
      className="absolute rounded-full pointer-events-none filter blur-[80px] md:blur-[120px] gpu-accel"
      style={{
        background: color,
        width: `var(--orb-width, ${size})`,
        height: `var(--orb-width, ${size})`,
        top: top,
        left: left,
        opacity: 'var(--orb-opacity, 0.4)',
        animation: `float-orb-${duration}s ${duration}s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`,
        '--orb-width': '100px', // Fallback
      } as React.CSSProperties}
    >
      <style>{`
        @keyframes float-orb-${duration}s {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(40px, -60px) scale(1.15);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.9);
          }
          100% {
            transform: translate(20px, -20px) scale(1.05);
          }
        }
        
        @media (max-width: 767px) {
          div {
            --orb-width: ${mobileSize} !important;
          }
        }
        @media (min-width: 768px) {
          div {
            --orb-width: ${size} !important;
          }
        }
      `}</style>
    </div>
  )
}
