import { useState, useContext } from 'react'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './current-ingredient.module.css'

import { ingredientForBurgerIngredients } from '../../../utils/propTypesSettings'
import { IngredientContext } from '../../../services/contexts'

const CurrentIngredient = ({ item }) => {
  const [count, setCount] = useState(0)
  const { setIngredient } = useContext(IngredientContext)
  function handleClick() {
    setCount(count + 1)
    setIngredient(item)
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
