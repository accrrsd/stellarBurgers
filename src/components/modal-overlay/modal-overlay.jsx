import style from './modal-overlay.module.css'
import propValidate from 'prop-types'

export default function ModalOverlay({ onClick }) {
  return <div className={style.overlay} onClick={onClick}></div>
}

ModalOverlay.propTypes = {
  onClick: propValidate.func.isRequired,
}
