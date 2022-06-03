import style from './modal.module.css'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import propValidate from 'prop-types'
const modalsContainer = document.querySelector('#modals')

export default function Modal({ title, onOverlayClick, onEscDown, children }) {
  useEffect(() => {
    document.addEventListener('keydown', onEscDown)
    return () => {
      document.removeEventListener('keydown', onEscDown)
    }
  }, [onEscDown])

  return ReactDOM.createPortal(
    <>
      <div className={style.overlay} onClick={onOverlayClick}>
        <div className={style.modal} onClick={(e) => e.stopPropagation()}>
          <div className={style.upper}>
            <h4 className={style.title}>{title ? title : ''}</h4>
            <button className={style.closeButton} onClick={onOverlayClick}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>,
    modalsContainer
  )
}
Modal.propTypes = {
  title: propValidate.string,
  onOverlayClick: propValidate.func.isRequired,
  onEscDown: propValidate.func.isRequired,
  children: propValidate.oneOfType([propValidate.node, propValidate.element]).isRequired,
}
