import avatarImg from '../image/0221bc46fa0a082057b4abe548965c24.jpg'
import { Mail, Globe } from 'lucide-react'

export interface SocialLink {
  label: string
  icon: any
  href: string
  color: string
  glowColor: string
}

export const profileConfig = {
  // Primary Header Info
  displayName: "Hu Tao",
  username: "@hutao",
  description: "Hu Tao merupakan Direktur ke-77 Wangsheng Funeral Parlor di Liyue. Ia dikenal sebagai sosok ceria, unik, dan penuh semangat, dengan kepribadian yang mampu membawa suasana hangat bagi orang-orang di sekitarnya.",

  // Avatar
  avatarUrl: avatarImg,

  // Social links
  socialLinks: [
    {
      label: "WhatsApp",
      icon: "whatsapp",
      href: "https://wa.me/",
      color: "from-green-600/30 to-emerald-500/20",
      glowColor: "rgba(34,197,94,0.3)",
    },
    {
      label: "Instagram",
      icon: "instagram",
      href: "https://instagram.com",
      color: "from-pink-500/20 to-purple-600/20",
      glowColor: "rgba(236,72,153,0.3)",
    },
    {
      label: "TikTok",
      icon: "tiktok",
      href: "https://tiktok.com",
      color: "from-gray-700/40 to-gray-900/40",
      glowColor: "rgba(255,255,255,0.1)",
    },
    {
      label: "Mail",
      icon: Mail,
      href: "mailto:hutao@wangsheng.liyue",
      color: "from-red-500/20 to-orange-600/20",
      glowColor: "rgba(239,68,68,0.3)",
    },
    {
      label: "Website",
      icon: Globe,
      href: "https://hutao.dev",
      color: "from-amber-500/20 to-orange-600/20",
      glowColor: "rgba(245,158,11,0.3)",
    },
  ] as SocialLink[],

  // Footer
  footer: {
    copyright: "© 2026 Wangsheng Funeral Parlor",
    version: "V1.0",
  }
}
