import { createModalController, ModalBase, useModalController, useModalTransitionState } from '@flightcore/uikit'
import clsx from 'clsx'
import { useEffect, useMemo, useRef, type CSSProperties } from 'react'

import { useStore } from '@nanostores/react'
import { atom } from 'nanostores'
import styles from './BookingModal.module.css'

export type BookingFrameStoreType = {
  width: number
  height: number
  loaded: boolean
}

export const bookingFrameStore = atom<BookingFrameStoreType>({
  width: 0,
  height: 0,
  loaded: false,
})

export const BookingModalInner = ({ onRequestsClose }: { onRequestsClose: () => void }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const { width, height, loaded } = useStore(bookingFrameStore)

  const showFrame = !!width && !!height && loaded

  const modalTransitionState = useModalTransitionState()
  const transitionClassName: string = useMemo(
    () =>
      ({
        entered: styles['dialog--entered'],
        entering: styles['dialog--entering'],
        exited: styles['dialog--exited'],
        exiting: styles['dialog--exiting'],
      })[modalTransitionState],
    [modalTransitionState],
  )

  useEffect(() => {
    function messageHandler(e: MessageEvent) {
      console.log(e.data)
      switch (e.data.type) {
        case 'resize':
          bookingFrameStore.set({
            ...bookingFrameStore.get(),
            width: e.data.elementWidth ?? 0,
            height: e.data.elementHeight ?? 0,
          })
          break
        case 'back_button_clicked':
          onRequestsClose()
          break
      }
    }
    window.addEventListener('message', messageHandler)
    return () => {
      window.removeEventListener('message', messageHandler)
    }
  }, [onRequestsClose])

  return (
    <div className="w-full h-full overflow-auto">
      <div
        onClick={onRequestsClose}
        className={clsx('flex justify-center items-center w-full h-full', transitionClassName)}
        style={
          {
            ...(width && { '--frame-width': `${width}px` }),
            ...(height && { '--frame-height': `${height}px` }),
          } as CSSProperties
        }>
        <iframe
          ref={iframeRef}
          src={import.meta.env.PUBLIC_BOOKING_IFRAME_SRC}
          className={clsx('relative z-10')}
          style={{
            width: `min(var(--frame-width, 900px), 100%)`,
            height: `var(--frame-height, 600px)`,
            visibility: showFrame ? 'visible' : 'hidden',
          }}
          onClick={(e) => e.stopPropagation()}
          onLoad={() =>
            bookingFrameStore.set({
              ...bookingFrameStore.get(),
              loaded: true,
            })
          }
          loading="eager"
          allowTransparency
        />
        <div className={clsx('z-0 select-none absolute flex flex-col justify-center items-center gap-2')}>
          <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="whitespace-pre text-xs text-white text-center">Szukamy, namierzamy{`\n`}- poczekaj chwile.</span>
        </div>
      </div>
    </div>
  )
}

export const modalController = createModalController()

export const BookingModal = () => {
  const {
    state: { visible },
    actions,
  } = useModalController(modalController)
  return (
    <ModalBase show={visible} onRequestClose={actions.hide}>
      <BookingModalInner onRequestsClose={actions.hide} />
    </ModalBase>
  )
}
