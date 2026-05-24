import React from 'react'
import { profileConfig } from '../data/profileConfig'
import { Music, Code2, Disc } from 'lucide-react'

export const ActivitySection: React.FC = () => {
  const { activity } = profileConfig

  return (
    <div className="flex flex-col gap-4 select-none">
      
      {/* Visual Header */}
      <div className="flex items-center gap-2 text-cyan-400 border-b border-white/5 pb-3">
        <Code2 size={16} />
        <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">{activity.title}</span>
      </div>

      {/* 1. Main Active Programming Process Card */}
      <div className="p-4 rounded-2xl border border-white/5 bg-[#05050a]/40 relative overflow-hidden group hover:border-pink-500/25 transition-all duration-300">
        <div className="absolute inset-0 bg-radial from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex justify-between items-start mb-2">
          <span className="text-[8px] font-mono tracking-widest px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 font-bold border border-pink-500/15">
            {activity.subtitle.toUpperCase()}
          </span>
          <span className="text-[9px] font-mono text-gray-500">{activity.duration}</span>
        </div>

        <h3 className="text-sm font-semibold text-white font-sans group-hover:text-pink-300 transition-colors mb-1">
          {activity.projectName}
        </h3>
        
        <p className="text-xs text-gray-400 font-mono leading-relaxed mb-3">
          &gt; {activity.details}
        </p>

        {/* Visual flashing process indicators */}
        <div className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-1.5 h-1.5 absolute rounded-full bg-emerald-400" />
          <span>COMPILING PIPELINES // RECONCILIATION SUCCESSFUL</span>
        </div>
      </div>

      {/* 2. Simulated Spotify Music Activity Badge */}
      {activity.spotifyTrack.isPlaying && (
        <div className="p-4 rounded-2xl border border-white/5 bg-gradient-to-r from-emerald-950/20 to-teal-950/10 flex items-center gap-4 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/10 border border-emerald-500/10 flex items-center justify-center overflow-hidden shrink-0">
            {/* Spinning glowing disk */}
            <Disc size={22} className="text-emerald-400 animate-spin duration-[8s]" />
            <div className="absolute inset-0 bg-radial from-emerald-400/10 to-transparent" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-[8px] font-mono tracking-widest text-emerald-400 font-bold uppercase mb-1">
              <Music size={8} className="animate-bounce" />
              <span>Simulated Spotify Stream</span>
            </div>
            <h4 className="text-xs font-semibold text-white font-sans truncate mb-0.5">
              {activity.spotifyTrack.song}
            </h4>
            <p className="text-[10px] text-gray-400 font-sans truncate">
              by {activity.spotifyTrack.artist}
            </p>
          </div>

          {/* Equalizer animation mini */}
          <div className="flex gap-[2px] items-end h-[12px] shrink-0 px-2 opacity-80">
            {[1, 2, 3].map((b) => (
              <div 
                key={b} 
                className="w-[1.8px] bg-emerald-400 rounded-full eq-bar" 
                style={{ 
                  animationDuration: `${0.8 + b * 0.25}s`,
                  animationDelay: `${b * 0.1}s` 
                }} 
              />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
