/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { ModalBase } from '../ModalBase/ModalBase'
import { ErrorIcon } from './ErrorIcon'
import { SuccessIcon } from './SuccessIcon'

interface ContactResponseModalProps {
  isSuccess: boolean
  show: boolean
  onClose: () => void
  message?: string
}

export const ContactResponseModal: React.FC<ContactResponseModalProps> = ({ isSuccess, show, onClose, message }) => {
  const defaultMessage = isSuccess ? 'Twoja wiadomość została wysłana. Stay tuned!' : 'Ups, coś poszło nie tak :('

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <ModalBase show={show} onRequestClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative w-[430px] lg:w-[624px] h-[654px] lg:h-[636px] bg-blue-dark rounded-b-[20px] lg:rounded-[20px] flex items-center justify-center">
          <button onClick={onClose} className="absolute top-4 right-5 text-white hover:text-gray-300 w-8 h-8">
            ✕
          </button>

          <div className="relative w-[388px] lg:w-[488px] h-[520px] lg:h-[500px] border-2 border-blue-medium rounded-[10px] flex flex-col items-center justify-center p-8">
            <div className="flex flex-col items-center gap-4">
              {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
              <p className="text-center text-ultra-light-blue text-xl font-bold leading-8 tracking-[0.25px] w-[324px]">
                {message || defaultMessage}
              </p>
            </div>

            <button
              onClick={onClose}
              className={`absolute -bottom-5 left-1/2 -translate-x-1/2 px-9 py-2.5 rounded-full text-sm font-normal uppercase tracking-[0.25px] h-10
           ${
             isSuccess
               ? 'bg-blue-dark border-[1.2px] border-green text-green'
               : 'bg-blue-dark border-[1.2px] border-red-500 text-red-500'
           }`}>
              {isSuccess ? 'OK' : 'SPRÓBUJ PONOWNIE'}
            </button>
          </div>
        </div>
      </div>
    </ModalBase>
  )
}
