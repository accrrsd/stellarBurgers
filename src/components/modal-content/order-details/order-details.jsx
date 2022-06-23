import '../../../fonts/jetBrainsFont.css'
import style from './order-details.module.css'
import propValidate from 'prop-types'
import orderDone from '../../../images/orderDone.jpg'
import { ConstructorContext } from '../../app/app'
import { useState, useContext, useEffect } from 'react'
import { postOrder } from '../../../utils/api'

const OrderDetails = ({ onSubmit }) => {
  const { constructorItems } = useContext(ConstructorContext)
  const [orderInfo, setOrderInfo] = useState(false)
  useEffect(() => {
    postOrder(constructorItems.map((item) => item._id)).then((data) => setOrderInfo(data))
  }, [constructorItems])
  return (
    <div className={style.wrapper}>
      <p className={`${style.nums} text text_type_digits-large`}>
        {orderInfo ? (orderInfo.success ? orderInfo.order.number : 'Ошибка') : '⠀'}
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
