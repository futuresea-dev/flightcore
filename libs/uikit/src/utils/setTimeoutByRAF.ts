export const setTimeoutByRAF = (
  callback: () => void,
  delay: number = 0
): (() => void) => {
  let start: number | null = null
  let animationFrameId: number | null = null

  const loop = (timestamp: number) => {
    if (start === null) start = timestamp
    const elapsed = timestamp - start

    if (elapsed >= delay) {
      callback()
    } else {
      animationFrameId = window.requestAnimationFrame(loop)
    }
  }

  animationFrameId = window.requestAnimationFrame(loop)

  // Return a function to cancel the timeout
  return () => {
    if (animationFrameId !== null) {
      window.cancelAnimationFrame(animationFrameId)
    }
  }
}
