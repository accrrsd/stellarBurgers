import style from './modal.module.css'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import propValidate from 'prop-types'
const modalsContainer = document.querySelector('#modals')

export default function Modal({ title, onEscKeyDown, children }) {
  const handleEscKeydown = (e) => e.key === 'Escape' && onEscKeyDown()
  useEffect(() => {
    document.addEventListener('keydown', handleEscKeydown)
    return () => {
      document.removeEventListener('keydown', handleEscKeydown)
    }
    // eslint-disable-next-line
  }, [])

  return ReactDOM.createPortal(
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
    </div>,
    modalsContainer
  )
}
Modal.propTypes = {
  title: propValidate.string,
  onEscKeyDown: propValidate.func.isRequired,
  children: propValidate.oneOfType([propValidate.node, propValidate.element]).isRequired,
}
