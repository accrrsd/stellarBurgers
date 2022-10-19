import style from './modal.module.css'
import { ReactNode, ReactPortal, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay'

const modalsContainer = document.querySelector('#modals')

type TModalProps = {
  title?: string
  onEscKeyDown: () => void
  children: ReactNode
}

export default function Modal({ title, onEscKeyDown, children }: TModalProps): ReactPortal {
  const handleEscKeydown = (e: KeyboardEvent) => e.key === 'Escape' && onEscKeyDown()
  useEffect(() => {
    document.addEventListener('keydown', handleEscKeydown)
    return () => {
      document.removeEventListener('keydown', handleEscKeydown)
    }
    // eslint-disable-next-line
  }, [])

  return createPortal(
    <>
      <div className={style.modal}>
        <div className={style.content} onClick={(e) => e.stopPropagation()}>
          <div className={style.upper}>
            <h4 className={style.title}>{title ? title : ''}</h4>
            <button className={style.closeButton} onClick={onEscKeyDown}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </div>
      <ModalOverlay onClick={onEscKeyDown} />
    </>,
    modalsContainer!
  )
}
