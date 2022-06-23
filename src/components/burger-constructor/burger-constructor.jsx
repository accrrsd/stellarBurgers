import { useState, useEffect, useContext } from 'react'
import propValidate from 'prop-types'
import style from './burger-constructor.module.css'
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientContext } from '../app/app'

//!! некорректно работает стоимость бургера

export default function BurgerConstructor({ onSubmit }) {
  const { ingredientsData } = useContext(IngredientContext)
  const sideBun = ingredientsData.find((item) => item.type === 'bun')
  // Данные для примера работы подсчета стоимости
  const [burgerValue, burgerValueSet] = useState(0)
  const [exampleDataArray, exampleDataArraySet] = useState(() => {
    const res = []
    for (let i = 0; i < 10; i++) {
      res.push(ingredientsData[i])
    }
    return res
  })

  const handleSubmitClick = () => onSubmit(true)
  const handleRemoveClick = (index) =>
    exampleDataArraySet(exampleDataArray.filter((item, itemIndex) => itemIndex !== index))

  useEffect(() => {
    burgerValueSet(exampleDataArray.reduce((sum, item) => sum + item.price, 0) + sideBun.price * 2)
    // eslint-disable-next-line
  }, [exampleDataArray])

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
        {exampleDataArray.map(
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
