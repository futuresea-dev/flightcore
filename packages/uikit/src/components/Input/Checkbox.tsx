import clsx from 'clsx'
import React, { useState } from 'react'
import styles from './Checkbox.module.css'

export type CheckboxProps = {
  label: string
  onChange?: (checked: boolean) => void
  required?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, onChange, required }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked)
    if (onChange) {
      onChange(e.target.checked)
    }
  }

  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        id="checkbox"
        className={clsx('w-5 h-5', styles.checkbox)}
        checked={isChecked}
        onChange={handleCheckboxChange}
        required={required}
      />
      <label htmlFor="checkbox" className={clsx('text-blue-lightest text-caption')}>
        {label}
      </label>
    </div>
  )
}
