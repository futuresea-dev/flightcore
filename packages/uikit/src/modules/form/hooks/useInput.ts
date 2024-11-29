import {
  useCallback,
  useMemo,
  useState,
  type ClassAttributes,
  type FocusEvent,
  type ForwardedRef,
  type InputHTMLAttributes,
} from 'react'
import { useMounted } from '../../shared'

/**
 * Manages the focus, blur, and touch state of an input element.
 *
 * @param inputProps - The properties of the input element, including optional error state.
 * @returns An array containing the input state and event handlers for focus and blur events.
 */
export const useInput: UseInput = (inputProps, ref) => {
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

  const isMounted = useMounted()
  const register = useCallback(() => {
    return {
      ref: (_ref: HTMLInputElement | null) => {
        if (typeof ref === 'function') {
          ref(_ref)
        } else if (ref) {
          ref.current = _ref
        }
        if (!_ref || isMounted.current) return

        // Mark the input as a focused if it has a value when the component mounts
        if (!_ref.value) return
        setState((prevState) => ({ ...prevState, focused: true }))
      },
    }
  }, [])

  return useMemo(
    () => [
      {
        ...state,
        focused: state.focused || !!inputProps.value,
      },
      {
        register,
        onFocus: handleOnFocus,
        onBlur: handleOnBlur,
      },
    ],
    [state, register, handleOnFocus, handleOnBlur, inputProps.value],
  )
}

export type UseInput = (
  inputProps: InputHTMLAttributes<HTMLInputElement> &
    ClassAttributes<HTMLInputElement> & {
      error?: boolean
    },
  ref?: ForwardedRef<HTMLInputElement>,
) => [
  InputState,
  {
    onFocus: (e: FocusEvent<HTMLInputElement, Element>) => void
    onBlur: (e: FocusEvent<HTMLInputElement, Element>) => void
    register: () => { ref: (ref: HTMLInputElement | null) => void }
  },
]

export type InputState = {
  focused: boolean
  touched: boolean
  dirty: boolean
}

export const defaultState: InputState = {
  focused: false,
  touched: false,
  dirty: false,
}
