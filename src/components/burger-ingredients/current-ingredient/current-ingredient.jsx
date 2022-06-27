import { useState } from 'react'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './current-ingredient.module.css'
import { useDispatch } from 'react-redux/es/exports'
import { openIngredientInfo } from '../../../services/slices/ingredientDetails'

import { ingredientForBurgerIngredients } from '../../../utils/propTypesSettings'

const CurrentIngredient = ({ item }) => {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  function handleClick() {
    setCount(count + 1)
    dispatch(openIngredientInfo(item))
  }
  return (
    <li className={style.ingredient} onClick={handleClick}>
      {count !== 0 && (
        <span className={style.ingredientCount}>
          <Counter count={count} size="default" />
        </span>
      )}
      <img className={style.ingredientImage} src={item.image} alt={item.name} />
      <span className={`${style.ingredientPrice} text text_type_digits-default`}>
        {item.price} <CurrencyIcon type="primary" />
      </span>
      <p className={style.ingredientName}>{item.name}</p>
    </li>
  )
}
CurrentIngredient.propTypes = ingredientForBurgerIngredients
export default CurrentIngredient
