import { useState, useEffect, useContext } from 'react'
import propValidate from 'prop-types'
import style from './burger-constructor.module.css'
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { IngredientContext } from '../../services/contexts'
import { postOrder } from '../../utils/api'

export default function BurgerConstructor({ setOrderInfo, onSubmit }) {
  const { ingredientsData } = useContext(IngredientContext)
  const [constructorItems, setConstructorItems] = useState([])
  const sideBun = ingredientsData.find((item) => item.type === 'bun')
  // Данные для примера работы подсчета стоимости
  const [burgerValue, burgerValueSet] = useState(0)
  const handleRemoveClick = (index) =>
    setConstructorItems(constructorItems.filter((item, itemIndex) => itemIndex !== index))

  const createOrder = () => {
    postOrder(constructorItems.map((item) => item._id)).then((data) => setOrderInfo(data))
    onSubmit(true)
  }

  //Заполняем ингредиенты конструктора данными
  useEffect(() => {
    setConstructorItems(() => {
      const res = []
      for (let i = 0; i < 10; i++) {
        ingredientsData[i].type !== 'bun' && res.push(ingredientsData[i])
      }
      return res
    })
    // eslint-disable-next-line
  }, [])

  // Подсчет стоимости бургера
  useEffect(() => {
    burgerValueSet(constructorItems.reduce((sum, item) => sum + item.price, 0) + sideBun.price * 2)
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
              handleClose={() => handleRemoveClick(index)}
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
          {burgerValue}
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
