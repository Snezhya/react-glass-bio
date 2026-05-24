import React, { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  
  // Synthesizer Nodes
  const nodesRef = useRef<{
    oscillators: OscillatorNode[]
    filter: BiquadFilterNode
    gainNode: GainNode
  } | null>(null)

  const stopMusic = () => {
    if (nodesRef.current) {
      nodesRef.current.oscillators.forEach(osc => {
        try {
          osc.stop()
        } catch (_) {}
      })
      nodesRef.current = null
    }
  }

  const startMusic = () => {
    // Initialize Web Audio context
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    
    const ctx = audioCtxRef.current
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    stopMusic()

    // 1. Create a deep space filter to cut high frequencies
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(140, ctx.currentTime) // Ethereal low hum
    filter.Q.setValueAtTime(3, ctx.currentTime)

    // 2. Master gain for soft ambient volume
    const gainNode = ctx.createGain()
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2) // Fade in

    // Connect chain
    filter.connect(gainNode)
    gainNode.connect(ctx.destination)

    // 3. Synthesize a rich cinematic drone chord (C2, G2, C3, E3)
    const frequencies = [65.41, 98.00, 130.81, 164.81] // Low harmonic chords
    const oscillators: OscillatorNode[] = []

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      // Mix of sawtooth and triangle for rich base
      osc.type = i % 2 === 0 ? 'triangle' : 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      // Add a slight frequency detuning to create an organic chorus breathing feel
      osc.detune.setValueAtTime((i - 1.5) * 6, ctx.currentTime)

      // Connect to filter
      osc.connect(filter)
      osc.start()
      oscillators.push(osc)
    })

    // 4. Modulate the lowpass filter frequency over time to create a sweeping pad effect
    let time = ctx.currentTime
    const modulate = () => {
      if (!nodesRef.current) return
      
      const sweepFreq = 140 + Math.sin(time * 0.4) * 40
      filter.frequency.setValueAtTime(sweepFreq, ctx.currentTime)
      time += 0.1
      
      setTimeout(modulate, 100)
    }
    
    nodesRef.current = { oscillators, filter, gainNode }
    modulate()
  }

  const togglePlayback = () => {
    if (isPlaying) {
      stopMusic()
      setIsPlaying(false)
    } else {
      startMusic()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    return () => {
      stopMusic()
    }
  }, [])

  return (
    <button
      onClick={togglePlayback}
      className={`glass-panel p-3 rounded-full flex items-center justify-center gap-2 cursor-pointer relative z-50 group hover:scale-105 active:scale-95 transition-all duration-300 tap-active gpu-accel ${
        isPlaying ? 'border-cyan-500/30' : ''
      }`}
      aria-label="Toggle Ambient Audio"
      title="Synthesize Space Ambient Loop"
    >
      {/* Visualizer bars */}
      <div className="flex gap-[2px] items-end h-[14px] w-[14px]">
        {[1, 2, 3, 4, 5].map((idx) => (
          <div
            key={idx}
            className={`w-[1.8px] bg-cyan-400 rounded-full transition-transform duration-300 ${
              isPlaying ? `eq-bar eq-bar-${idx}` : 'h-1 scale-y-100 opacity-40'
            }`}
          />
        ))}
      </div>

      <span className="text-[10px] tracking-widest font-mono text-gray-400 group-hover:text-cyan-400 transition-colors uppercase select-none">
        {isPlaying ? 'AMBIENT // ACTIVE' : 'AMBIENT // MUTE'}
      </span>

      {isPlaying ? (
        <Volume2 size={12} className="text-cyan-400" />
      ) : (
        <VolumeX size={12} className="text-gray-500 group-hover:text-gray-400" />
      )}
    </button>
  )
}
