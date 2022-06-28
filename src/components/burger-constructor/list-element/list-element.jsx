import { useDispatch } from 'react-redux'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { forwardRef } from 'react'
import { removeItem } from '../../../services/slices/constructorList'
import style from './list-element.module.css'

export function ListElement({ item, index }) {
  const dispatch = useDispatch()
  return (
    <li className={style.elementContainer}>
      <span className={style.icon}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        thumbnail={item.image}
        text={item.name}
        price={item.price}
        handleClose={() => dispatch(removeItem(index))}
      />
    </li>
  )
}

export const PhantomListElement = forwardRef(({ item }, ref) => {
  return (
    <li className={style.elementContainer} ref={ref}>
      <span className={style.icon}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement thumbnail={item.image} text={item.name} price={item.price} />
    </li>
  )
})
