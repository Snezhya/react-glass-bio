import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDone(true)
      setTimeout(onComplete, 600)
    }, 1400)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: '#07050f' }}
        >
          {/* Simple elegant spinner */}
          <div className="flex flex-col items-center gap-5">
            <div className="relative w-12 h-12">
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid transparent',
                  borderTopColor: '#00ffe0',
                  borderRightColor: '#7c3aed',
                }}
              />
              {/* Inner dot */}
              <div className="absolute inset-[14px] rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 opacity-80" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[11px] tracking-widest text-white/40 font-mono uppercase"
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
