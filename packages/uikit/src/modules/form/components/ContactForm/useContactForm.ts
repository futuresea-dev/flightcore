import { useController, useForm, type UseControllerProps } from 'react-hook-form'
import type { ContactFormValues } from './ContactFormEntity'

export type UseContactFormControlProps<N extends keyof ContactFormValues> = UseControllerProps<ContactFormValues, N>

export const useContactForm = () =>
  useForm<ContactFormValues>({
    reValidateMode: 'onChange',
  })

export const useContactFormControl = <N extends keyof ContactFormValues>(options: UseContactFormControlProps<N>) =>
  useController<ContactFormValues, N>(options)
