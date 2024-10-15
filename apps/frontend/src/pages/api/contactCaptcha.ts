// /pages/api/contact.ts
import type { APIRoute } from 'astro'
import axios from 'axios'

const { CONTACT_WEBHOOK_URL, CONTACT_WEBHOOK_TOKEN_KEY, CONTACT_WEBHOOK_TOKEN_VALUE, RECAPTCHA_SECRET, NODE_ENV } = process.env

if (!CONTACT_WEBHOOK_URL) throw new Error(`CONTACT_WEBHOOK_URL is undefined`)
if (!CONTACT_WEBHOOK_TOKEN_KEY) throw new Error(`CONTACT_WEBHOOK_TOKEN_KEY is undefined`)
if (!CONTACT_WEBHOOK_TOKEN_VALUE) throw new Error(`CONTACT_WEBHOOK_TOKEN_VALUE is undefined`)
if (!RECAPTCHA_SECRET) throw new Error(`RECAPTCHA_SECRET is undefined`)

export const post: APIRoute = async ({ request }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 })
  }

  const { token, name, lastName, email, phone, message, consent } = await request.json()

  if (!token || !name || !lastName || !email || !phone || !message || !consent) {
    return new Response(JSON.stringify({ message: 'Bad Request' }), { status: 400 })
  }

  try {
    if (NODE_ENV !== 'development') {
      const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
        params: {
          secret: RECAPTCHA_SECRET,
          response: token,
        },
      })

      const { success } = response.data

      if (!success) {
        return new Response(JSON.stringify({ message: 'reCAPTCHA verification failed' }), { status: 400 })
      }
    }

    await axios.post(
      CONTACT_WEBHOOK_URL,
      { name, lastName, email, phone, message, consent },
      {
        headers: {
          [CONTACT_WEBHOOK_TOKEN_KEY]: CONTACT_WEBHOOK_TOKEN_VALUE,
        },
      },
    )

    return new Response(JSON.stringify({ message: 'Contact form submitted successfully' }), { status: 200 })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error processing contact form submission:', error)
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
  }
}