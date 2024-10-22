import { useEffect } from 'react'

export const useEvent = <T extends Event>(
  eventName: string,
  handler: (event: T) => void,
  element: EventTarget | undefined | false,
  registerCallback?: () => void,
) => {
  useEffect(() => {
    if (!element) return
    // Create event listener that calls handler function stored in ref
    const eventListener = (event: Event) => {
      handler(event as T)
    }
    // Add event listener
    element.addEventListener(eventName, eventListener)
    registerCallback?.()
    // Remove event listener on cleanup
    return () => {
      element.removeEventListener(eventName, eventListener)
    }
  }, [eventName, handler, registerCallback])
}
