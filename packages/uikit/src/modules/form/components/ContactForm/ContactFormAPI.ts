import ky from 'ky'
import type { ContactFormValues } from './ContactFormEntity'

export const sendContactForm = async (formData: ContactFormValues) => {
  return ky
    .post('/api/contact', {
      json: formData,
    })
    .json()
}
