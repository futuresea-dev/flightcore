import * as React from 'react'

export const CheckSVG: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m6 12.641 4.744 4.743L18.334 6"></path>
  </svg>
)

export default React.memo(CheckSVG)
