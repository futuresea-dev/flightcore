import { usePromise, type UsePromiseConfig } from '../../../shared/hooks'
import { sendContactForm } from './ContactFormAPI'
import type { ContactFormValues } from './ContactFormEntity'

export const useContactFormPromise = (config?: Partial<UsePromiseConfig<unknown, [ContactFormValues]>>) => {
  return usePromise(
    {
      ...config,
      enabled: false,
      promiseFn: sendContactForm,
    },
    'useContactFormPromise',
  )
}
