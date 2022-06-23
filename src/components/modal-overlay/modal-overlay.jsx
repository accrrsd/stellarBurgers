import style from './modal-overlay.module.css'
export default function ModalOverlay({ onClick }) {
  return <div className={style.overlay} onClick={onClick}></div>
}
