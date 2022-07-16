import '../../../fonts/jetBrainsFont.css'
import propValidate from 'prop-types'
import style from './order-details.module.css'
import orderDone from '../../../images/orderDone.jpg'

import { useSelector } from 'react-redux/es/exports'

const OrderDetails = ({ onSubmit }) => {
  const orderInfo = useSelector((store) => store.orderDetailsReducer)
  return (
    <div className={style.wrapper}>
      <p className={`${style.nums} text text_type_digits-large`}>
        {orderInfo.success
          ? orderInfo.success === 'pending'
            ? 'Ждём'
            : orderInfo.number
          : 'Ошибка'}
      </p>
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
