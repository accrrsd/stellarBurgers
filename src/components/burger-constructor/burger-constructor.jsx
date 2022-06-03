import { useState, useEffect } from 'react'
import propValidate from 'prop-types'
import style from './burger-constructor.module.css'
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientData from '../../utils/data'

export default function BurgerConstructor({ onSubmit }) {
  const sideBun = IngredientData.find((item) => (item.name = 'Краторная булка N-200i'))
  // Данные для примера работы подсчета стоимости
  const [burgerValue, burgerValueSet] = useState(0)
  const [dataArray, dataArraySet] = useState(() => {
    const res = []
    for (let i = 0; i < 10; i++) {
      res.push(IngredientData[i])
    }
    return res
  })

  const handleSubmitClick = () => onSubmit(true)
  const handleRemoveClick = (index) =>
    dataArraySet(dataArray.filter((item, itemIndex) => itemIndex !== index))

  useEffect(() => {
    burgerValueSet(dataArray.reduce((sum, item) => sum + item.price, 0) + sideBun.price * 2)
    // eslint-disable-next-line
  }, [dataArray])

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
        {dataArray.map(
          (item, index) =>
            item.type !== 'bun' && (
              <li className={style.elementContainer} key={index}>
                <DragIcon type="primary" />
                <ConstructorElement
                  thumbnail={item.image}
                  text={item.name}
                  price={item.price}
                  handleClose={() => handleRemoveClick(index)}
                />
              </li>
            )
        )}
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
        <Button type="primary" size="large" onClick={handleSubmitClick}>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}
BurgerConstructor.propTypes = {
  onSubmit: propValidate.func,
}
