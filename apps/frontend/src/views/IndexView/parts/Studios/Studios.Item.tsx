import { useState, type FC } from 'react'

import styles from './Studios.Item.module.css'
import { ModalBase } from '@flightcore/uikit'

export type StudiosItemPropsType = {
  poster: string
  title: string
  desc: string
  photos: string[]
}

export const StudiosItem: FC<StudiosItemPropsType> = ({
  poster,
  title,
  desc,
  photos,
}) => {
  const [showDialog, setShowDialog] = useState(false)
  return (
    <>
      <div
        tabIndex={0}
        onClick={() => setShowDialog((v) => !v)}
        className={styles['studio-item']}
      >
        <div className={styles['inner-container']}>
          <img src={poster} className={styles['studio-item__poster']} />
          <p className={styles['studio-item__title']}>{title}</p>
        </div>
        <div className={styles['overlay']}>
          <span>Pokaż szczegóły</span>
        </div>
      </div>
      <ModalBase
        show={showDialog}
        onRequestClose={() => setShowDialog((v) => !v)}
      >
        <div className={styles['dialog']}>
          <div className={styles['dialog-card']}>
            <button className={styles['dialog-close']}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M23.77 25.096L7.33 8.656A.938.938 0 018.654 7.33l16.44 16.44a.938.938 0 01-1.325 1.326z"
                ></path>
                <path
                  fill="currentColor"
                  d="M25.096 8.655l-16.44 16.44a.938.938 0 01-1.327-1.325L23.77 7.33a.938.938 0 011.327 1.325z"
                ></path>
              </svg>
            </button>
            <div style={{ width: 528, height: 400, background: '#333' }}></div>
            <p className={styles['dialog-text']}>{desc}</p>
          </div>
        </div>
      </ModalBase>
    </>
  )
}
