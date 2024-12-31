import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Button } from '../Button'

const COOKIE_CONSENT_KEY = 'cookie-consent-accepted'

export const CookieConsent: FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!hasConsent) setIsVisible(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-medium z-50 rounded-t-[20px]">
      <button onClick={handleAccept} className="absolute top-4 right-4 text-green hover:text-green-accent md:hidden">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <div className="container flex flex-row items-center justify-between py-6">
        <div className="flex flex-row items-center gap-4 flex-1">
          <p className="text-body2 text-blue-lightest md:whitespace-nowrap">
            Strona wykorzystuje pliki cookies. Szczegóły znajdziesz w{' '}
            <a href="/privacy-policy" className="text-green hover:text-green-accent transition-colors">
              Polityce prywatności
            </a>
            .
          </p>
          <Button
            onClick={handleAccept}
            variant="filled"
            color="green"
            size="small"
            className="w-[120px] h-[60px] flex items-center justify-center md:w-auto md:h-auto">
            <span className="text-blue-dark">WYRAŻAM ZGODĘ</span>
          </Button>
        </div>
        <button onClick={handleAccept} className="text-green hover:text-green-accent hidden md:block ml-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
