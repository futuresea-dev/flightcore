import { useState } from 'react'
import type { ContactFormValues } from './ContactFormEntity'

interface ContactFormPromiseOptions {
  events: {
    onResolved: () => void
    onRejected: (error: unknown) => void
  }
}

export const useContactFormPromise = ({ events }: ContactFormPromiseOptions) => {
  const [state, setState] = useState<'idle' | 'pending' | 'resolved' | 'rejected'>('idle')
  const [error, setError] = useState<unknown>(null)

  const execute = async (data: ContactFormValues) => {
    setState('pending')
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Wystąpił błąd podczas wysyłania formularza')
      }

      setState('resolved')
      events.onResolved()
    } catch (err) {
      setState('rejected')
      setError(err)
      events.onRejected(err)
    }
  }

  return {
    execute,
    state,
    error,
  }
}
