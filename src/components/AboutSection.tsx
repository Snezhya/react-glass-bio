import React from 'react'
import { motion } from 'framer-motion'
import { profileConfig } from '../data/profileConfig'
import { HardDrive } from 'lucide-react'

export const AboutSection: React.FC = () => {
  const { about } = profileConfig

  return (
    <div className="flex flex-col gap-4 select-none">
      
      {/* Tab Header */}
      <div className="flex items-center gap-2 text-cyan-400 border-b border-white/5 pb-3">
        <HardDrive size={16} />
        <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">{about.title}</span>
      </div>

      {/* Bio Paragraph */}
      <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-sans font-normal">
        {about.bio}
      </p>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mt-2">
        {about.metrics.map((metric, idx) => {
          const MetricIcon = metric.icon
          
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-3.5 rounded-2xl border border-white/5 bg-[#05050a]/30 flex flex-col justify-between h-[85px] md:h-[90px] relative overflow-hidden group hover:border-purple-500/25 transition-colors duration-300"
            >
              {/* Decorative radial card glow */}
              <div className="absolute inset-0 bg-radial from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Metric Icon */}
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono tracking-wider text-gray-500 uppercase">{metric.label}</span>
                {MetricIcon && <MetricIcon size={14} className="text-purple-400" />}
              </div>

              {/* Metric Value */}
              <span className="text-lg md:text-xl font-heading font-bold text-white tracking-wide mt-1.5">
                {metric.value}
              </span>
            </motion.div>
          )
        })}
      </div>

    </div>
  )
}
