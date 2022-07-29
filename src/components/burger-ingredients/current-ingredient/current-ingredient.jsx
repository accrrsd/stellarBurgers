import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './current-ingredient.module.css'

import { openIngredientInfo } from '../../../services/slices/ingredientDetails'
import { ingredientType } from '../../../utils/propTypesSettings'
import { useDrag } from 'react-dnd'
import { useLocation, useNavigate } from 'react-router-dom'

const CurrentIngredient = ({ item }) => {
  const [count, setCount] = useState(0)
  const sideBun = useSelector((store) => store.constructorReducer.sideBun)
  const items = useSelector((store) => store.constructorReducer.items)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    sideBun && item._id === sideBun._id
      ? setCount(2)
      : setCount(
          items.reduce((sum, itemOfList) => (itemOfList._id === item._id ? sum + 1 : sum + 0), 0)
        )
  }, [items, item._id, sideBun])

  const dispatch = useDispatch()
  const [{ isDrag }, dragRef] = useDrag({
    type: `ingredient/${item.type}`,
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  })
  function handleClick() {
    sessionStorage.setItem('openedIngredient', JSON.stringify(item))
    dispatch(openIngredientInfo(item))
    navigate(`ingredients/${item._id}`, { state: { background: location } })
  }
  return (
    !isDrag && (
      <li className={style.ingredient} onClick={handleClick} ref={dragRef}>
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
  )
}
CurrentIngredient.propTypes = ingredientType
export default CurrentIngredient
