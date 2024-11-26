import clsx from 'clsx'
import React from 'react'

export type CheckboxProps = {
  label: string
  checked: boolean
  onChange?: (checked: boolean) => void
  required?: boolean
  error?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, required }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type="checkbox"
          id="checkbox"
          className={clsx(
            'appearance-none bg-extra-dark rounded w-5 h-5 border-2 border-blue-medium inline-block cursor-pointer relative flex-shrink-0',
            checked && 'bg-green border-green',
          )}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          required={required}
        />
        {checked && (
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">✔</span>
        )}
      </div>
      <label htmlFor="checkbox" className="text-blue-lightest text-caption">
        {label}
      </label>
    </div>
  )
}
