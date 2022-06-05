import '../../../fonts/jetBrainsFont.css'
import style from './order-details.module.css'
import propValidate from 'prop-types'
import orderDone from '../../../images/orderDone.jpg'

const OrderDetails = ({ onSubmit }) => {
  return (
    <div className={style.wrapper}>
      <p className={`${style.nums} text text_type_digits-large`}>034536</p>
      <h4 className={`${style.subtitle} text text_type_main-medium`}>Идентификатор заказа</h4>
      <button className={style.checkMark} onClick={onSubmit}>
        <img src={orderDone} alt="Принять" />
      </button>
      <span className={style.text}>Ваш заказ начали готовить</span>
      <span className={`${style.subText} text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  )
}

OrderDetails.propTypes = {
  onSubmit: propValidate.func,
}

export default OrderDetails
