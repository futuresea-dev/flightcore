import React, { useState, useCallback, useEffect, useMemo } from 'react';
import type { ChangeEvent } from 'react';
import { Input, Textarea, Button, EmailInput, PhoneInput, Checkbox } from '../index';

export interface ContactFormProps {
  onSubmit?: (formData: any) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });

  const [formState, setFormState] = useState({
    name: false,
    lastName: false,
    email: false,
    phone: false,
    message: false,
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateFormValidity = useCallback((fieldName: string, isValid: boolean) => {
    setFormState(prevState => ({
      ...prevState,
      [fieldName]: isValid,
    }));
  }, []);

  const updateFormData = useCallback((fieldName: string, value: string | boolean) => {
    //console.log(`Updating form data: ${fieldName} = ${value}`);
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  }, []);

  const isFormValid = useMemo(() => {
    const dataValid = Object.entries(formData).every(([key, value]) => {
      if (key === 'consent') return value === true;
      return typeof value === 'string' && value.trim() !== '';
    });
    const stateValid = Object.values(formState).every(Boolean);
    return dataValid && stateValid;
  }, [formData, formState]);

  useEffect(() => {
    //console.log('Form data:', formData);
    //console.log('Form state:', formState);
    //console.log('Is form valid:', isFormValid);
  }, [formData, formState, isFormValid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) {
      //console.log('Form is not valid or is already submitting');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    //console.log('Submitting form data:', formData);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      //const data = await response.json();
      //console.log('Server response:', data);

      if (onSubmit) onSubmit(formData);
      // Reset form here if needed
    } catch (error) {
      //console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    //console.log(`Input changed: ${name} = ${value}`);
    updateFormData(name, value);
    updateFormValidity(name, value.trim() !== '');
  }, [updateFormData, updateFormValidity]);

  const handlePhoneChange = useCallback((value: string) => {
    //console.log(`Phone changed: ${value}`);
    updateFormData('phone', value);
    updateFormValidity('phone', value.trim() !== '');
  }, [updateFormData, updateFormValidity]);

  const handleConsentChange = useCallback((checked: boolean) => {
    //console.log(`Consent changed: ${checked}`);
    updateFormData('consent', checked);
    updateFormValidity('consent', checked);
  }, [updateFormData, updateFormValidity]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 flex w-full flex-col items-center justify-between rounded-[30px] border-2 border-blue-medium p-8 md:mt-0 md:w-[520px] h-auto"
    >
      <div className="w-full space-y-6">
        <Input
          id="name"
          name="name"
          label="Imię*"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          id="lastName"
          name="lastName"
          label="Nazwisko*"
          required
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <EmailInput
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
        <PhoneInput
          id="phone"
          name="phone"
          label="Telefon*"
          required
          value={formData.phone}
          onChange={(e) => {
            if (typeof e === 'string') {
              handlePhoneChange(e);
            } else {
              handleInputChange(e);
            }
          }}
        />
        <Textarea
          id="message"
          name="message"
          label="Wiadomość*"
          required
          value={formData.message}
          onChange={handleInputChange}
        />
        <Checkbox
          label="Wyrażam zgodę na przetwarzanie moich danych osobowych przez Flightcore Studios."
          required
          onChange={handleConsentChange}
        />
      </div>

      {submitError && <div className="text-error mt-4">{submitError}</div>}

      <Button
        size="large"
        color="green"
        variant="filled"
        className="mt-6 w-full h-[58px] text-lg text-flightcore-ultra-light-blue"
        type="submit"
        isFormValid={isFormValid}
        checkValidation={true}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </Button>
    </form>
  );
};