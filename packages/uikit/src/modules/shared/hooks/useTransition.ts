import { useEffect, useMemo, useRef, useState } from 'react'
import { setTimeoutByRAF } from '../../../utils/setTimeoutByRAF'

export type TransitionState = 'entered' | 'entering' | 'exiting' | 'exited'

export type TransitionEvents = {
  onEntering?: () => void
  onEnteringStart?: () => void
  onEntered?: () => void
  onExitingStart?: () => void
  onExiting?: () => void
  onExited?: () => void
}

export type TransitionOptions = {
  transitionOnMount?: boolean
  transitionIn?: boolean
  duration?: number
  delay?: number
  events?: TransitionEvents
}

export const useTransition = (options?: TransitionOptions) => {
  const { transitionOnMount = false, transitionIn = true, duration = 300, delay = 0, events } = options || {}

  const transitionTimeoutCanceller = useRef<() => void>()
  const delayTimeoutCanceller = useRef<() => void>()

  const initialTransitionState = useMemo(() => {
    if (transitionOnMount) {
      return transitionIn ? 'exited' : 'entered'
    }
    return transitionIn ? 'entered' : 'exited'
  }, [])

  const [transitionState, setTransitionState] = useState<TransitionState>(initialTransitionState)

  const lastTransitionState = useRef<TransitionState>()

  // Events effects
  useEffect(() => {
    // if (typeof lastTransitionState.current === 'undefined') {
    //   lastTransitionState.current = transitionState
    //   return
    // }
    if (transitionState === lastTransitionState.current) return
    const eventFn = {
      entered: events?.onEntered,
      entering: events?.onEntering,
      exited: events?.onExited,
      exiting: events?.onExiting,
    }[transitionState]
    eventFn?.()
    lastTransitionState.current = transitionState
  }, [events?.onEntered, events?.onEntering, events?.onExited, events?.onExiting, transitionState, initialTransitionState])

  useEffect(() => {
    if (transitionIn && transitionState === 'exited') {
      events?.onEnteringStart?.()
      delayTimeoutCanceller.current = setTimeoutByRAF(() => {
        setTransitionState('entering')
      }, delay)
      return () => {
        delayTimeoutCanceller.current?.()
      }
    }

    if (!transitionIn && transitionState === 'entered') {
      events?.onExitingStart?.()
      delayTimeoutCanceller.current = setTimeoutByRAF(() => {
        setTransitionState('exiting')
      }, delay)
      return () => {
        delayTimeoutCanceller.current?.()
      }
    }
  }, [transitionIn, transitionState, delay, events?.onEnteringStart, events?.onExitingStart])

  useEffect(() => {
    if (transitionIn && transitionState === 'entering') {
      transitionTimeoutCanceller.current?.()
      transitionTimeoutCanceller.current = setTimeoutByRAF(() => {
        setTransitionState('entered')
      }, duration)
    }

    if (!transitionIn && transitionState === 'exiting') {
      transitionTimeoutCanceller.current?.()
      transitionTimeoutCanceller.current = setTimeoutByRAF(() => {
        setTransitionState('exited')
      }, duration)
    }
  }, [duration, transitionIn, transitionState])

  return useMemo(
    () => ({
      transitionState,
      isMount: transitionState !== 'exited',
    }),
    [transitionState],
  )
}
