export type ContactFormValues = {
  name: string
  lastName: string
  email: string
  phone: string
  message: string
  consent: boolean
}

export const defaultContactFormValues: ContactFormValues = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
}
