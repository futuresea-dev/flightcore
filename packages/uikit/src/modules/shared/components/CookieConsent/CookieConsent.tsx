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
      <div className="container flex justify-between items-center py-6">
        <p className="text-body2 text-blue-lightest max-w-2xl">
          Strona wykorzystuje pliki cookies. Szczegóły znajdziesz w{' '}
          <a href="/privacy-policy" className="text-green hover:text-green-accent transition-colors">
            Polityce prywatności
          </a>
          .
        </p>
        <div className="flex items-center gap-4">
          <Button onClick={handleAccept} variant="filled" color="green" size="small">
            <span className="text-blue-dark">WYRAŻAM ZGODĘ</span>
          </Button>
          <button onClick={handleAccept} className="text-green hover:text-green-accent">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
