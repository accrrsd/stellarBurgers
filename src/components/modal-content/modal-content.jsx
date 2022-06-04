import orderStyle from './order-accepted.module.css'
import orderDone from '../../images/orderDone.jpg'
import propValidate from 'prop-types'

import infoStyle from './ingredient-info.module.css'
import '../../fonts/jetBrainsFont.css'

const OrderDetails = ({ onSubmit }) => {
  return (
    <div className={orderStyle.wrapper}>
      <p className={`${orderStyle.nums} text text_type_digits-large`}>034536</p>
      <h4 className={`${orderStyle.subtitle} text text_type_main-medium`}>Идентификатор заказа</h4>
      <button className={orderStyle.checkMark} onClick={onSubmit}>
        <img src={orderDone} alt="Принять" />
      </button>
      <span className={orderStyle.text}>Ваш заказ начали готовить</span>
      <span className={`${orderStyle.subText} text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  )
}

OrderDetails.propTypes = {
  onSubmit: propValidate.func,
}

const IngredientDetails = ({ item }) => {
  return (
    <div className={infoStyle.wrapper}>
      <img src={item.image} alt={item.name} className={infoStyle.image} />
      <span className={infoStyle.name}>{item.name}</span>
      <ul className={infoStyle.dataWrapper}>
        <li>
          <p className={infoStyle.dataItem}>
            <span>Калории,ккал</span>
            <span> {item.calories ? item.calories : '?'}</span>
          </p>
        </li>
        <li>
          <p className={infoStyle.dataItem}>
            <span>Белки, г</span>
            <span> {item.proteins ? item.proteins : '?'}</span>
          </p>
        </li>
        <li>
          <p className={infoStyle.dataItem}>
            <span>Жиры, г</span>
            <span> {item.fat ? item.fat : '?'}</span>
          </p>
        </li>
        <li>
          <p className={infoStyle.dataItem}>
            <span>Углеводы, г</span>
            <span> {item.carbohydrates ? item.carbohydrates : '?'}</span>
          </p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  item: propValidate.shape({
    _id: propValidate.string,
    name: propValidate.string.isRequired,
    type: propValidate.string,
    proteins: propValidate.number.isRequired,
    fat: propValidate.number.isRequired,
    carbohydrates: propValidate.number.isRequired,
    calories: propValidate.number.isRequired,
    price: propValidate.number,
    image: propValidate.string.isRequired,
    image_mobile: propValidate.string,
    image_large: propValidate.string,
    __v: propValidate.any,
  }).isRequired,
}

export { OrderDetails, IngredientDetails }
