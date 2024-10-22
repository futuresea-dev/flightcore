type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  return function (...args: Parameters<T>) {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
