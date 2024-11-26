import React, { useCallback } from 'react'
import { type UseControllerProps } from 'react-hook-form'

import { Button } from '../../../shared/components/Button/Button'
import type { ContactFormValues } from './ContactFormEntity'
import { ConsentField } from './fields/Consent/ConsentField'
import { EmailField } from './fields/Email/EmailField'
import { FirstNameField } from './fields/FirstName/FirstNameField'
import { LastNameField } from './fields/LastName/LastNameField'
import { MessageField } from './fields/Message/MessageField'
import { PhoneField } from './fields/Phone/PhoneField'
import { useContactForm } from './useContactForm'
import { useContactFormPromise } from './useContactFormPromise'

export type ContactFormControlProps<N extends keyof ContactFormValues> = UseControllerProps<ContactFormValues, N>

export const ContactForm: React.FC = () => {
  const { formState, control, handleSubmit, setError } = useContactForm()
  const {
    execute,
    state: promiseState,
    error: promiseError,
  } = useContactFormPromise({
    events: {
      onRejected(reason) {
        // eslint-disable-next-line no-console
        console.error(reason)
        setError('root', {
          message: String(reason) ? String(reason) : 'An error occurred',
        })
      },
    },
  })

  const onFormSubmit = useCallback((formValues: ContactFormValues) => execute(formValues), [])

  const isDisabled = promiseState === 'pending' || formState.isDirty === false

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="mt-12 flex w-full flex-col items-center justify-between rounded-[30px] border-2 border-blue-medium p-8 md:mt-0 md:w-[520px] h-auto">
      <div className="flex flex-col gap-6 w-full">
        <FirstNameField control={control} />
        <LastNameField control={control} />
        <EmailField control={control} />
        <PhoneField control={control} />
        <MessageField control={control} />
        <ConsentField control={control} />
      </div>

      {promiseError && <div className="text-error mt-4">{promiseError.message}</div>}

      <Button
        size="large"
        color="green"
        variant="filled"
        className="mt-6 w-full h-[58px] text-lg text-flightcore-ultra-light-blue"
        type="submit"
        disabled={isDisabled}>
        {promiseState === 'pending' ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </Button>
    </form>
  )
}
