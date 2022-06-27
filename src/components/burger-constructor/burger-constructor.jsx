import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import propValidate from 'prop-types'
import style from './burger-constructor.module.css'
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { removeItem, initItems, changeValue } from '../../services/slices/constructorList'
import { getOrderDetails } from '../../services/slices/orderDetails'

export default function BurgerConstructor() {
  const ingredientsData = useSelector((store) => store.ingredientsReducer.ingredients)
  const dispatch = useDispatch()

  const constructorItems = useSelector((store) => store.constructorReducer.items)
  const constructorValue = useSelector((store) => store.constructorReducer.value)

  const sideBun = ingredientsData.find((item) => item.type === 'bun')

  const createOrder = () => {
    dispatch(getOrderDetails(constructorItems.map((item) => item._id)))
  }

  //Заполняем ингредиенты конструктора данными
  useEffect(() => {
    dispatch(initItems(ingredientsData))
    // eslint-disable-next-line
  }, [])

  // Подсчет стоимости бургера
  useEffect(() => {
    dispatch(
      changeValue(constructorItems.reduce((sum, item) => sum + item.price, 0) + sideBun.price * 2)
    )
    // eslint-disable-next-line
  }, [constructorItems])

  return (
    <div className={style.wrapper}>
      <div className={style.elementWrapper}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${sideBun.name} (верх)`}
          price={sideBun.price}
          thumbnail={sideBun.image}
        />
      </div>
      <ul className={style.container}>
        {constructorItems.map((item, index) => (
          <li className={style.elementContainer} key={index}>
            <DragIcon type="primary" />
            <ConstructorElement
              thumbnail={item.image}
              text={item.name}
              price={item.price}
              handleClose={() => dispatch(removeItem(index))}
            />
          </li>
        ))}
      </ul>
      <div className={style.elementWrapper}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${sideBun.name} (низ)`}
          price={sideBun.price}
          thumbnail={sideBun.image}
        />
      </div>
      <div className={style.bottomContainer}>
        <span className={`${style.bottomCounter} text text_type_digits-medium`}>
          {constructorValue}
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={createOrder}>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}
BurgerConstructor.propTypes = {
  setOrderInfo: propValidate.func,
  onSubmit: propValidate.func,
}
