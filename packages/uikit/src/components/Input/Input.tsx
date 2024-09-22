import clsx from 'clsx'
import { forwardRef, type InputHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={clsx(
        'placeholder:text-muted-foreground flex h-[58px] w-full rounded-[10px] border border-flightcore-medium-blue bg-extra-dark px-4 pb-[6px] pt-[22px] text-lg/[30px]  text-flightcore-ultra-light-blue file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:border-flightcore-ultra-light-blue focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export { Input }
