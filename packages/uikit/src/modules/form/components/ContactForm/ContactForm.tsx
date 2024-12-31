import React, { useCallback } from 'react'
import { type UseControllerProps } from 'react-hook-form'
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
  const { formState, control, handleSubmit, setError, watch } = useContactForm()
  const formValues = watch()

  const {
    execute,
    state: promiseState,
    error: promiseError,
  } = useContactFormPromise({
    events: {
      onRejected(reason) {
        // Error handling is done via setError below
        setError('root', {
          message: String(reason) ? String(reason) : 'An error occurred',
        })
      },
    },
  })

  const onFormSubmit = useCallback((formValues: ContactFormValues) => execute(formValues), [])

  const isFormValid =
    formState.isDirty &&
    !formState.errors.email &&
    !formState.errors.name &&
    !formState.errors.lastName &&
    !formState.errors.phone &&
    !formState.errors.message &&
    formValues.consent === true

  const isDisabled = promiseState === 'pending' || !isFormValid

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
      <button
        type="submit"
        disabled={isDisabled}
        className={`mt-6 w-full h-[58px] rounded-full text-lg font-medium uppercase tracking-wider transition-colors
          ${
            isFormValid
              ? 'bg-green hover:bg-green-dark text-blue-dark cursor-pointer'
              : 'bg-blue-lightest text-blue-medium cursor-not-allowed'
          }`}>
        {promiseState === 'pending' ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </button>
    </form>
  )
}
