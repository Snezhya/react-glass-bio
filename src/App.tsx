import { useState } from 'react'
import { motion } from 'framer-motion'

import { profileConfig } from './data/profileConfig'
import { BackgroundEffects } from './components/BackgroundEffects'
import { CustomCursor } from './components/CustomCursor'
import { LoadingScreen } from './components/LoadingScreen'
import { ThemeToggle } from './components/ThemeToggle'
import { MusicPlayer } from './components/MusicPlayer'


// Inline simple link button matching the reference style
const SimpleLinkButton = ({ link, index }: { link: typeof profileConfig.socialLinks[0], index: number }) => {
  const renderIcon = () => {
    if (typeof link.icon === 'string') {
      const brand = link.icon.toLowerCase()
      switch (brand) {
        case 'whatsapp':
          return <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        case 'tiktok':
          return <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z"/></svg>
        case 'github':
          return <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        case 'linkedin':
          return <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        case 'twitter':
          return <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        case 'instagram':
          return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        default:
          return null
      }
    } else {
      const Icon = link.icon
      return Icon ? <Icon size={18} /> : null
    }
  }

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 + 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.97 }}
      className="w-full h-12 px-5 rounded-full flex items-center gap-3 text-white text-sm font-medium transition-all duration-200 cursor-pointer select-none"
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <span className="text-white/80">{renderIcon()}</span>
      <span>{link.label}</span>
    </motion.a>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <LoadingScreen onComplete={() => setLoading(false)} />
      <BackgroundEffects />
      <CustomCursor />

      {!loading && (
        <div className="w-full min-h-dvh flex flex-col items-center justify-center px-5 py-10 relative z-10">

          {/* Top controls */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-5 right-5 flex items-center gap-3"
          >
            <MusicPlayer />
            <ThemeToggle />
          </motion.div>

          {/* Main card — glass pill like the reference */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[340px] rounded-[32px] p-7 flex flex-col items-center gap-4"
            style={{
              background: 'linear-gradient(145deg, rgba(120,40,180,0.55) 0%, rgba(40,20,90,0.65) 60%, rgba(20,80,80,0.3) 100%)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >

            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Cyan glow ring */}
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #00ffe0, #7c3aed, #ec4899, #00ffe0)',
                  padding: '3px',
                  borderRadius: '9999px',
                  filter: 'blur(0px)',
                }}
              />
              <div className="relative w-[90px] h-[90px] rounded-full p-[3px]"
                style={{
                  background: 'conic-gradient(from 0deg, #00ffe0, #7c3aed, #ec4899, #00ffe0)',
                }}
              >
                <img
                  src={profileConfig.avatarUrl}
                  alt={profileConfig.displayName}
                  className="w-full h-full rounded-full object-cover"
                  draggable="false"
                />
              </div>
              {/* Glow bloom behind */}
              <div className="absolute inset-0 rounded-full -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(0,255,224,0.4) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                  transform: 'scale(1.3)',
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-center px-2"
            >
              <h1 className="text-white text-xl font-bold tracking-wide mb-2">
                {profileConfig.displayName}
              </h1>
              <p className="text-white/55 text-[12px] leading-relaxed">
                {profileConfig.description}
              </p>
            </motion.div>

            {/* Link Buttons */}
            <div className="w-full flex flex-col gap-2.5 mt-1">
              {profileConfig.socialLinks.map((link, idx) => (
                <SimpleLinkButton key={link.label} link={link} index={idx} />
              ))}
            </div>



          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-[10px] font-mono text-white/20 tracking-widest uppercase"
          >
            {profileConfig.footer.version}
          </motion.p>



        </div>
      )}
    </>
  )
}

export default App
