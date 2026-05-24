import React from 'react'
import { FloatingOrb } from './FloatingOrb'
import { useDeviceDetect } from '../hooks/useDeviceDetect'

export const BackgroundEffects: React.FC = () => {
  const { isMobile } = useDeviceDetect()

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden select-none pointer-events-none bg-[#05050a] transition-colors duration-700">
      
      {/* 1. Fine Digital Noise Overlay */}
      <div className="noise-overlay" />

      {/* 2. Abstract Shifting Mesh Gradients / Floating Orbs */}
      <div className="absolute inset-0 z-0">
        {/* Orb 1: Cyan Glow */}
        <FloatingOrb
          color="radial-gradient(circle, rgba(0,255,204,0.4) 0%, rgba(0,255,204,0) 70%)"
          size="400px"
          mobileSize="200px"
          top="-5%"
          left="-10%"
          duration={25}
          delay={0}
        />

        {/* Orb 2: Deep Purple Glow */}
        <FloatingOrb
          color="radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(168,85,247,0) 70%)"
          size="450px"
          mobileSize="250px"
          top="45%"
          left="65%"
          duration={30}
          delay={2}
        />

        {/* Desktop-only additional Orbs to increase visual depth */}
        {!isMobile && (
          <>
            {/* Orb 3: Soft Pink Neon */}
            <FloatingOrb
              color="radial-gradient(circle, rgba(244,63,94,0.25) 0%, rgba(244,63,94,0) 70%)"
              size="350px"
              top="75%"
              left="-5%"
              duration={22}
              delay={4}
            />

            {/* Orb 4: Subtle Dark Indigo Center */}
            <FloatingOrb
              color="radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0) 70%)"
              size="500px"
              top="20%"
              left="25%"
              duration={35}
              delay={1}
            />
          </>
        )}
      </div>

      {/* 3. Subtle Cybernetic Vector Grid Lines (Desktop Only) */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 85%)',
          }}
        />
      )}

      {/* 4. Elegant Floating Geometric Glass Panels (Desktop Only) */}
      {!isMobile && (
        <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
          {/* Top Right Panel */}
          <div 
            className="absolute w-[300px] h-[100px] rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-[4px] rotate-12 top-[10%] right-[8%] animate-[float-panel_20s_infinite_alternate]"
          />
          {/* Bottom Left Panel */}
          <div 
            className="absolute w-[200px] h-[200px] rounded-[30px] border border-white/5 bg-white/[0.01] backdrop-blur-[2px] -rotate-6 bottom-[15%] left-[5%] animate-[float-panel_24s_infinite_alternate]"
          />
        </div>
      )}

      <style>{`
        @keyframes float-panel {
          0% { transform: translateY(0) rotate(var(--tw-rotate, 0deg)); }
          100% { transform: translateY(-20px) rotate(calc(var(--tw-rotate, 0deg) + 3deg)); }
        }
      `}</style>
    </div>
  )
}
