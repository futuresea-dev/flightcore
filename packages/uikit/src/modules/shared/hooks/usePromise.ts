import { useCallback, useLayoutEffect, useState } from 'react'

export function usePromise<A, B extends unknown[]>(config: UsePromiseConfig<A, B>, key?: string): UsePromiseReturnType<A, B> {
  const { events, promiseFn, enabled } = config

  const [{ state, error, data }, setState] = useState<UsePromiseState<A>>({
    state: 'idle',
  })

  const execute = useCallback(
    async (...promiseFnArgs: B) => {
      if (state === 'pending') {
        // eslint-disable-next-line no-console
        console.debug(`Avoid usePromise.execute() [key: ${key}] call while the promise is pending`)
        return
      }
      try {
        setState((s) => ({ ...s, state: 'pending' }))
        events?.onSettled?.()
        const promiseResult = await promiseFn(...promiseFnArgs)
        setState((s) => ({ ...s, state: 'resolved' }))
        events?.onResolved?.(promiseResult)
        return promiseResult
      } catch (e) {
        setState((s) => ({ ...s, state: 'rejected', error: e instanceof Error ? e : undefined }))
        events?.onRejected?.(e)
      } finally {
        events?.onFinalized?.()
      }
    },
    [state, promiseFn, events?.onSettled, events?.onResolved, events?.onRejected, events?.onFinalized],
  )

  useLayoutEffect(
    useCallback(() => {
      if (enabled !== true) return
      if (state !== 'idle') return
      execute(...([] as unknown as B))
    }, [enabled, state, execute]),
  )

  return {
    execute,
    state,
    data,
    error,
  }
}

export type UsePromiseEvents<A = unknown> = {
  onSettled: () => void
  onResolved: (data: A) => void
  onRejected: (reason: unknown) => void
  onFinalized: () => void
}

export type UsePromiseConfig<A = unknown, B extends unknown[] = unknown[]> =
  | {
      promiseFn: (...promiseFnArgs: B) => Promise<A>
      events?: Partial<UsePromiseEvents<A>>
      enabled?: false | undefined
    }
  | {
      promiseFn: () => Promise<A>
      events?: Partial<UsePromiseEvents<A>>
      enabled: true
    }

export type PromiseState = 'idle' | 'pending' | 'resolved' | 'rejected'
export type UsePromiseState<A = unknown> = {
  state: PromiseState
  error?: Error
  data?: A
}

export type UsePromiseReturnType<A = unknown, B extends unknown[] = unknown[]> = {
  data?: A
  state: PromiseState
  error?: Error
  execute: UsePromiseExecuteFn<A, B>
}

export type UsePromiseType = (config: UsePromiseConfig, key?: string) => UsePromiseReturnType

export type UsePromiseExecuteFn<A = unknown, B extends unknown[] = unknown[]> =
  | ((...promiseFnArgs: B) => Promise<A | undefined>)
  | (() => Promise<A | undefined>)
