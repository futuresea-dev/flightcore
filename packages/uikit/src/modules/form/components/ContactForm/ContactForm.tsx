import React, { useCallback, useEffect, useState } from 'react'
import { ContactResponseModal } from '../../../shared/components/ContactResponseModal'
import { validatePhoneNumber } from '../InputPhoneNumber/InputPhoneNumberValidator'
import type { ContactFormValues } from './ContactFormEntity'
import { ConsentField } from './fields/Consent/ConsentField'
import { EmailField } from './fields/Email/EmailField'
import { FirstNameField } from './fields/FirstName/FirstNameField'
import { LastNameField } from './fields/LastName/LastNameField'
import { MessageField } from './fields/Message/MessageField'
import { PhoneField } from './fields/Phone/PhoneField'
import { useContactForm } from './useContactForm'
import { useContactFormPromise } from './useContactFormPromise'

export const ContactForm: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { formState, control, handleSubmit, setError, watch, reset } = useContactForm()
  const formValues = watch()
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  useEffect(() => {
    if (formValues.phone) {
      validatePhoneNumber(formValues.phone).then(setIsPhoneValid)
    }
  }, [formValues.phone])

  const {
    execute,
    state: promiseState,
    error: promiseError,
  } = useContactFormPromise({
    events: {
      onResolved() {
        setIsSuccess(true)
        setShowModal(true)
        reset()
      },
      onRejected(reason) {
        setIsSuccess(false)
        setShowModal(true)
        setError('root', {
          message: String(reason) ? String(reason) : 'An error occurred',
        })
      },
    },
  })

  const onFormSubmit = useCallback((formValues: ContactFormValues) => execute(formValues), [execute])

  const isFormValid =
    formState.isDirty &&
    formValues.name?.trim() &&
    formValues.lastName?.trim() &&
    formValues.email?.trim() &&
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formValues.email) &&
    formValues.phone?.trim() &&
    formValues.message?.trim() &&
    !formState.errors.email &&
    !formState.errors.name &&
    !formState.errors.lastName &&
    !formState.errors.phone &&
    !formState.errors.message &&
    formValues.consent === true &&
    isPhoneValid

  const isDisabled = promiseState === 'pending' || !isFormValid

  return (
    <>
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
          className={`mt-6 w-full h-[58px] rounded-full text-lg font-medium uppercase tracking-wider
            ${
              isFormValid
                ? 'bg-green hover:bg-green-dark text-blue-dark cursor-pointer'
                : 'bg-blue-lightest text-blue-medium cursor-not-allowed'
            }`}>
          {promiseState === 'pending' ? 'Wysyłanie...' : 'Wyślij wiadomość'}
        </button>
      </form>

      {/* <div className="space-x-4">
        <button
          onClick={() => {
            setIsSuccess(true)
            setShowModal(true)
          }}>
          Test Success
        </button>

        <button
          onClick={() => {
            setIsSuccess(false)
            setShowModal(true)
          }}>
          Test Error
        </button>
      </div> */}
      <ContactResponseModal show={showModal} isSuccess={isSuccess} onClose={() => setShowModal(false)} />
    </>
  )
}
