import { useDispatch, useSelector } from 'react-redux'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import { forwardRef, useRef } from 'react'
import { removeItem, moveItem, dropMovableItem } from '../../../services/slices/constructorList'
import style from './list-element.module.css'

export function ListElement({ item, index, stylized }) {
  const dispatch = useDispatch()
  const elementRef = useRef(null)
  const draggingIndex = useSelector((store) => store.constructorReducer.draggingIndex)
  const [, dropRef] = useDrop({
    accept: 'constructor/listElement',
    hover(item, monitor) {
      if (!elementRef.current) {
        return
      }
      const elemIndex = item.index
      const dragOver = index
      // Защита от замещения самого себя
      if (elemIndex === dragOver) {
        return
      }
      // Координаты на экране
      const hoverBoundingRect = elementRef.current?.getBoundingClientRect()
      // Вертикаль
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Позиция курсора
      const clientOffset = monitor.getClientOffset()
      // отступ количества пикселей сверху
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Пересекли больше половины:
      // Движение вниз
      if (elemIndex < dragOver && hoverClientY < hoverMiddleY) {
        return
      }
      // Движение вверх
      if (elemIndex > dragOver && hoverClientY > hoverMiddleY) {
        return
      }
      // Изменения массива
      dispatch(moveItem({ elemIndex, dragOver }))

      item.index = dragOver
    },
  })
  const [, dragRef] = useDrag({
    type: 'constructor/listElement',
    item: () => {
      return { index }
    },
    end() {
      dispatch(dropMovableItem())
    },
  })
  dragRef(dropRef(elementRef))

  return (
    <li
      className={style.elementContainer}
      ref={elementRef}
      style={{ opacity: stylized !== 1 || draggingIndex === index ? 0.5 : 1 }}
    >
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

export const PhantomListElement = forwardRef(({ item }, elementRef) => {
  return (
    <li className={style.elementContainer} ref={elementRef}>
      <span className={style.icon}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement thumbnail={item.image} text={item.name} price={item.price} />
    </li>
  )
})
