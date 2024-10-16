// src/pages/api/contact.ts
import type { APIRoute } from 'astro'
import axios from 'axios'

const CONTACT_WEBHOOK_URL = import.meta.env.CONTACT_WEBHOOK_URL
const CONTACT_WEBHOOK_TOKEN_KEY = import.meta.env.CONTACT_WEBHOOK_TOKEN_KEY
const CONTACT_WEBHOOK_TOKEN_VALUE = import.meta.env.CONTACT_WEBHOOK_TOKEN_VALUE

if (!CONTACT_WEBHOOK_URL) throw new Error(`CONTACT_WEBHOOK_URL is undefined`)
if (!CONTACT_WEBHOOK_TOKEN_KEY) throw new Error(`CONTACT_WEBHOOK_TOKEN_KEY is undefined`)
if (!CONTACT_WEBHOOK_TOKEN_VALUE) throw new Error(`CONTACT_WEBHOOK_TOKEN_VALUE is undefined`)

export const POST: APIRoute = async ({ request }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const { name, lastName, email, phone, message, consent } = await request.json()

    if (!name || !lastName || !email || !phone || !message || consent === undefined) {
      return new Response(JSON.stringify({ message: 'Bad Request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
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

    return new Response(JSON.stringify({ message: 'Contact form submitted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    //console.error('Error processing contact form submission:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
