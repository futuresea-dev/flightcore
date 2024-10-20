import { useEffect, useRef } from 'react'

/**
 * Tracks previous state of a value.
 *
 * @param value Props, state or any other calculated value.
 * @returns Value from the previous render of the enclosing component.
 *
 * @example
 * function Component() {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 *   // ...
 *   return `Now: ${count}, before: ${prevCount}`;
 * }
 */
export function usePrevious<T>(value: T): T | undefined {
  // Source: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

// https://raw.githubusercontent.com/kripod/react-hooks/master/packages/state-hooks/src/usePrevious.ts
