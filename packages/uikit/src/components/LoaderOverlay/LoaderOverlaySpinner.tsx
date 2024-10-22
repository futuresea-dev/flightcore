import { useEffect } from 'react'

import { hide, show } from './LoaderOverlayController'

export const LoaderOverlaySpinner = () => {
  useEffect(() => {
    function handleBeforePreparation(ev: any) {
      const originalLoader = ev.loader
      ev.loader = async function () {
        show()
        await originalLoader()
        hide()
      }
    }

    document.addEventListener('astro:before-preparation', handleBeforePreparation)
    return () => document.removeEventListener('astro:before-preparation', handleBeforePreparation)
  }, [])
  return (
    <div id="overlay" className="hidden">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  )
}
