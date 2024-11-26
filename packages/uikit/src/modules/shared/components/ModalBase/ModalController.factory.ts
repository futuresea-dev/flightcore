import { useStore } from '@nanostores/react'
import { atom, type WritableAtom } from 'nanostores'

export type ModalControllerConfig = Record<string, unknown>

export interface IModalControllerState<ResolveValue = unknown> {
  config?: ModalControllerConfig
  visible: boolean
  promiseHandlers?: { resolve: (value: ResolveValue) => void; reject: (reason?: any) => void }
}

export type ModalControllerState<ResolveValue = unknown> = WritableAtom<IModalControllerState<ResolveValue>>

export type ModalControllerActions<ResolveValue = unknown> = {
  show: (config?: ModalControllerConfig) => Promise<ResolveValue>
  hide: () => void
  updateConfig: (newConfig: ModalControllerConfig) => void
  isVisible: () => boolean
}

export type ModalController<ResolveValue = unknown> = {
  state: ModalControllerState<ResolveValue>
  actions: ModalControllerActions<ResolveValue>
}

export function createModalController<ResolveValue = unknown>(
  defaultConfig?: ModalControllerConfig,
  defaultVisible: boolean = false,
): ModalController<ResolveValue> {
  const state: ModalControllerState<ResolveValue> = atom<IModalControllerState<ResolveValue>>({
    config: defaultConfig,
    visible: defaultVisible,
    promiseHandlers: undefined,
  })

  const actions: ModalControllerActions<ResolveValue> = {
    show: (newConfig?: ModalControllerConfig) => {
      state.set({
        ...state.get(),
        config: newConfig,
        visible: true,
      })
      return new Promise<ResolveValue>((resolve, reject) => {
        state.set({
          ...state.get(),
          promiseHandlers: { resolve, reject },
        })
      })
    },
    hide: () => {
      const { promiseHandlers } = state.get()
      if (promiseHandlers) {
        promiseHandlers.reject()
      }
      state.set({
        ...state.get(),
        visible: false,
        promiseHandlers: undefined,
        config: undefined,
      })
    },
    updateConfig: (newConfig: ModalControllerConfig) => {
      state.set({
        ...state.get(),
        config: newConfig,
      })
    },
    isVisible: () => {
      return state.get().visible
    },
  }

  return { state, actions }
}

export const useModalController = <ResolveValue = unknown>({ state, actions }: ModalController<ResolveValue>) => {
  return {
    state: useStore(state),
    actions,
  }
}
