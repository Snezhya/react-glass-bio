import avatarImg from '../image/0221bc46fa0a082057b4abe548965c24.jpg'

import { 
  Mail, 
  Globe, 
  Terminal, 
  Layers,
  Sparkles,
  Command
} from 'lucide-react'

export interface SocialLink {
  label: string
  icon: any
  href: string
  color: string // Tailwind color variables or custom gradients
  glowColor: string
}

export interface Metric {
  label: string
  value: string
  icon: any
}

export interface AIResponse {
  keyword: string
  buttonLabel: string
  response: string
}

export const profileConfig = {
  // Primary Header Info
  displayName: "Snezhya",
  username: "@snezhya",
  tagline: "Systems architect and immersive frontend designer crafting next-generation digital ecosystems.",
  status: {
    label: "ACTIVE PROTOCOL",
    glowColor: "#00ffcc",
  },
  
  // High quality premium futuristic avatar
  avatarUrl: avatarImg,

  // Typewriter sub-headings (rotating states)
  typewriterStrings: [
    "Building reactive Web3 overlay grids...",
    "Optimizing real-time Supabase pipelines...",
    "Architecting high-performance glass interfaces...",
    "Running neural client nodes in 2026...",
  ],

  // About Me Tab
  about: {
    title: "System Diagnostics",
    bio: "Focused on bridging the gap between massive backend sync systems and premium visual fidelity. I build highly responsive client dashboards that prioritize visual elegance, zero layout thrashing, and low-latency interaction models.",
    metrics: [
      { label: "Code Deploys", value: "1,420+", icon: Terminal },
      { label: "Sync Nodes", value: "32 Online", icon: Layers },
      { label: "Render Target", value: "60 FPS", icon: Sparkles },
      { label: "System Uptime", value: "99.98%", icon: Command },
    ] as Metric[],
  },

  // Current Activity Block (Real-time Simulation)
  activity: {
    title: "System Sub-Process",
    subtitle: "Active Development",
    projectName: "Supabase-Sync-Portal",
    details: "Refactoring offline client-side sync pipelines & real-time cursor channels",
    duration: "2 hrs 14 mins active",
    spotifyTrack: {
      song: "Synthetic Horizon (Lofi Edit)",
      artist: "DataStream",
      isPlaying: true,
    }
  },

  // Easily editable Social links using Lucide React elements or string identifiers
  socialLinks: [
    {
      label: "GitHub Source",
      icon: "github",
      href: "https://github.com",
      color: "from-gray-800 to-gray-950 hover:border-gray-500/30",
      glowColor: "rgba(255,255,255,0.15)",
    },
    {
      label: "LinkedIn Professional",
      icon: "linkedin",
      href: "https://linkedin.com",
      color: "from-blue-600/40 to-cyan-500/40 hover:border-blue-400/30",
      glowColor: "rgba(59,130,246,0.3)",
    },
    {
      label: "Twitter / X Protocol",
      icon: "twitter",
      href: "https://x.com",
      color: "from-[#1da1f2]/20 to-indigo-500/20 hover:border-[#1da1f2]/30",
      glowColor: "rgba(29,161,242,0.3)",
    },
    {
      label: "Instagram Visuals",
      icon: "instagram",
      href: "https://instagram.com",
      color: "from-pink-500/20 to-purple-600/20 hover:border-pink-400/30",
      glowColor: "rgba(236,72,153,0.3)",
    },
    {
      label: "Mail Channel",
      icon: Mail,
      href: "mailto:snezhya@proton.me",
      color: "from-emerald-500/20 to-teal-600/20 hover:border-emerald-400/30",
      glowColor: "rgba(16,185,129,0.3)",
    },
    {
      label: "Personal Network",
      icon: Globe,
      href: "https://snezhya.dev",
      color: "from-amber-500/20 to-orange-600/20 hover:border-amber-400/30",
      glowColor: "rgba(245,158,11,0.3)",
    }
  ] as SocialLink[],

  // Interactive dialogue paths for our mock Voice AI assistant
  aiVoiceResponses: [
    {
      keyword: "greet",
      buttonLabel: "Identity Verification",
      response: "Identity scanned. Access granted. Welcome, guest user. I am Snezhya's cybernetic representative, initialized in May 2026. All active communication ports are operating normally."
    },
    {
      keyword: "stack",
      buttonLabel: "Core Stack Metrics",
      response: "Accessing technological core. Snezhya operates heavily within React 19, TypeScript, Tailwind CSS v4, GSAP, and PostgreSQL/Supabase. Special emphasis is placed on sub-60ms database triggers and modular interfaces."
    },
    {
      keyword: "focus",
      buttonLabel: "Active Operations",
      response: "Retrieving active tasks. Currently deploying and optimizing a multi-device class portal with real-time sync fallbacks, D-pad navigation, and local storage state persistence."
    },
    {
      keyword: "hire",
      buttonLabel: "Contract Protocol",
      response: "Initiating recruitment protocols. Available for select futuristic UI/UX client commissions, deep styling audits, and full-stack React systems. Send a packet through the Mail Channel."
    }
  ] as AIResponse[],

  // Footer text
  footer: {
    copyright: "© 2026 SNEZHYA // NEURAL NET PROTOCOL",
    version: "V2.6.4-BETA",
  }
}
