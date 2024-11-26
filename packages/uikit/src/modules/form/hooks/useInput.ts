import { useCallback, useMemo, useState, type ClassAttributes, type FocusEvent, type InputHTMLAttributes } from 'react'

/**
 * Manages the focus, blur, and touch state of an input element.
 *
 * @param inputProps - The properties of the input element, including optional error state.
 * @returns An array containing the input state and event handlers for focus and blur events.
 */
export const useInput: UseInput = (inputProps) => {
  const [state, setState] = useState<InputState>(defaultState)

  const handleOnFocus = useCallback(
    (e: FocusEvent<HTMLInputElement, Element>) => {
      setState((prevState) => ({ ...prevState, focused: true }))
      inputProps.onFocus?.(e)
    },
    [inputProps.onFocus],
  )

  const handleOnBlur = useCallback(
    (e: FocusEvent<HTMLInputElement, Element>) => {
      setState((prevState) => ({ ...prevState, focused: false, touched: true }))
      inputProps?.onBlur?.(e)
    },
    [inputProps.onBlur],
  )

  return useMemo(
    () => [
      {
        ...state,
        focused: state.focused || !!inputProps.value,
      },
      {
        onFocus: handleOnFocus,
        onBlur: handleOnBlur,
      },
    ],
    [state, handleOnFocus, handleOnBlur, inputProps.value],
  )
}

export type UseInput = (
  inputProps: InputHTMLAttributes<HTMLInputElement> &
    ClassAttributes<HTMLInputElement> & {
      error?: boolean
    },
) => [
  InputState,
  {
    onFocus: (e: FocusEvent<HTMLInputElement, Element>) => void
    onBlur: (e: FocusEvent<HTMLInputElement, Element>) => void
  },
]

export type InputState = {
  focused: boolean
  touched: boolean
}

export const defaultState: InputState = {
  focused: false,
  touched: false,
}
