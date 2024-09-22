import { atom, type WritableAtom } from 'nanostores'

export interface IModalController {
  visible: boolean
  show: () => void
  hide: () => void
  toggle: () => void
  readonly $visible?: WritableAtom<boolean>
}

export function createModalController(): IModalController {
  const controller = {
    $visible: atom<boolean>(false),
    get visible() {
      return controller.$visible.get()
    },
    set visible(v: boolean) {
      controller.$visible.set(v)
    },
    show() {
      controller.visible = true
    },
    hide() {
      controller.visible = true
    },
    toggle() {
      controller.visible = !controller.visible
    },
  }
  return controller
}
