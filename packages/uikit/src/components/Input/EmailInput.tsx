import React, { forwardRef } from 'react';
import type { InputProps } from './Input';
import { Input } from './Input';

const EmailInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const validateEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  return (
    <Input
      {...props}
      ref={ref}
      type="email"
      validate={validateEmail}
      label="Email*"
    />
  );
});

EmailInput.displayName = 'EmailInput';
export { EmailInput };
