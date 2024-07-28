import clsx from 'clsx'
import React from 'react'

type CheckListPropsType = {
  items: string[]
}

export const CheckList: React.FC<CheckListPropsType & React.HTMLAttributes<HTMLDivElement>> = ({ items, ...props }) => {
  return (
    <div {...props} className={clsx('space-y-[12px]', props?.className)} role="list">
      {items.map((text, index) => (
        <div className="flex gap-[14px]" role="listitem" key={index}>
          <div
            aria-label="Checkmark"
            className="shrink-0 my-[2px] leading-[30px] p-[4px] w-[26px] h-[26px] rounded-full bg-blue-medium"
            role="figure">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 12.641L10.7436 17.3845L18.3333 6"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span className="text-body1 font-light">{text}</span>
        </div>
      ))}
    </div>
  )
}
