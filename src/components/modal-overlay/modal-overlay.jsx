import style from './modal-overlay.module.css'
import ReactDOM from 'react-dom'
const modalsContainer = document.querySelector('#modals')
export default function ModalOverlay({ onClick }) {
  return ReactDOM.createPortal(
    <div className={style.overlay} onClick={onClick}></div>,
    modalsContainer
  )
}
