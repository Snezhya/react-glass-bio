import { useEffect, useState } from 'react'

export function useDeviceDetect() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const narrowScreen = window.innerWidth < 768
      
      setIsTouch(hasTouch)
      setIsMobile(narrowScreen || (hasTouch && window.innerWidth < 1024))
    }

    checkDevice()
    window.addEventListener('resize', checkDevice, { passive: true })
    
    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, [])

  return { isMobile, isTouch }
}
