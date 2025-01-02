// src/pages/api/contact.ts
import type { APIRoute } from 'astro'
import axios from 'axios'

const { CONTACT_WEBHOOK_URL, CONTACT_WEBHOOK_TOKEN_KEY, CONTACT_WEBHOOK_TOKEN_VALUE } = process.env

// Prosty logger, który można później zastąpić bardziej zaawansowanym rozwiązaniem
const logger = {
  error: (message: string, error?: unknown) => {
    // W środowisku produkcyjnym można tu zaimplementować właściwe logowanie
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error(message, error)
    }
  },
}

// Sprawdzamy zmienne środowiskowe podczas inicjalizacji
if (!CONTACT_WEBHOOK_URL || !CONTACT_WEBHOOK_TOKEN_KEY || !CONTACT_WEBHOOK_TOKEN_VALUE) {
  logger.error('Missing required environment variables for contact form')
}

interface ContactFormData {
  name: string
  lastName: string
  email: string
  phone: string
  message: string
  consent: boolean
}

export const POST: APIRoute = async ({ request }) => {
  // Sprawdzamy metodę HTTP
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Niedozwolona metoda.',
      }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }

  try {
    // Sprawdzamy czy webhook jest skonfigurowany
    if (!CONTACT_WEBHOOK_URL || !CONTACT_WEBHOOK_TOKEN_KEY || !CONTACT_WEBHOOK_TOKEN_VALUE) {
      throw new Error('CONTACT_WEBHOOK_CONFIGURATION_ERROR')
    }

    // Parsujemy dane z formularza
    const formData: ContactFormData = await request.json()

    // Walidacja otrzymanych danych
    if (!formData || typeof formData !== 'object') {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Nieprawidłowy format danych.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    const { name, lastName, email, phone, message, consent } = formData

    // Szczegółowa walidacja pól
    if (!name?.trim() || !lastName?.trim() || !email?.trim() || !phone?.trim() || !message?.trim() || consent === undefined) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Proszę wypełnić wszystkie wymagane pola.',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }

    // Próba wysłania danych do webhooka
    try {
      await axios.post(
        CONTACT_WEBHOOK_URL,
        { name, lastName, email, phone, message, consent },
        {
          headers: {
            [CONTACT_WEBHOOK_TOKEN_KEY]: CONTACT_WEBHOOK_TOKEN_VALUE,
          },
          timeout: 5000, // 5 sekund timeout
        },
      )

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Dziękujemy za wysłanie wiadomości. Odpowiemy najszybciej jak to możliwe!',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    } catch (webhookError) {
      logger.error('Webhook error:', webhookError)
      throw new Error('WEBHOOK_ERROR')
    }
  } catch (error) {
    logger.error('Contact form error:', error)

    // Określamy odpowiedni komunikat błędu
    let errorMessage =
      'Przepraszamy, wystąpił problem z wysłaniem wiadomości. Prosimy spróbować później lub skontaktować się z nami telefonicznie.'

    if (error instanceof Error) {
      switch (error.message) {
        case 'CONTACT_WEBHOOK_CONFIGURATION_ERROR':
          errorMessage =
            'Przepraszamy, system kontaktowy jest tymczasowo niedostępny. Prosimy spróbować później lub skontaktować się telefonicznie.'
          break
        case 'WEBHOOK_ERROR':
          errorMessage =
            'Przepraszamy, nie udało się przetworzyć zgłoszenia. Prosimy spróbować później lub skontaktować się telefonicznie.'
          break
        // Możesz dodać więcej przypadków obsługi błędów
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: errorMessage,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
