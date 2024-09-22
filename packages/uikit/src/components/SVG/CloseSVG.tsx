import type { FC } from 'react'

export const CloseSVG: FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32" className={className}>
    <path fill="currentColor" d="M23.77 25.096L7.33 8.656A.938.938 0 018.654 7.33l16.44 16.44a.938.938 0 01-1.325 1.326z"></path>
    <path
      fill="currentColor"
      d="M25.096 8.655l-16.44 16.44a.938.938 0 01-1.327-1.325L23.77 7.33a.938.938 0 011.327 1.325z"></path>
  </svg>
)
