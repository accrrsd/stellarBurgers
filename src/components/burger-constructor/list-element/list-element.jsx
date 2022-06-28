import { useDispatch, useSelector } from 'react-redux'
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import { forwardRef, useRef } from 'react'
import { removeItem, moveItem, dropMovableItem } from '../../../services/slices/constructorList'
import style from './list-element.module.css'

export function ListElement({ id, item, index }) {
  //! Можно покапать в сторону определения массива обьектов
  const dispatch = useDispatch()
  const elementRef = useRef(null)
  const draggingIndex = useSelector((store) => store.constructorReducer.draggingIndex)
  const [, dropRef] = useDrop({
    accept: 'constructor/listElement',
    collect(monitor) {},
    drop() {
      dispatch(dropMovableItem())
    },
    hover(item, monitor) {
      if (!elementRef.current) {
        return
      }
      const elemIndex = item.index
      const dragOver = index
      // Don't replace items with themselves
      if (elemIndex === dragOver) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = elementRef.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (elemIndex < dragOver && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (elemIndex > dragOver && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      dispatch(moveItem({ elemIndex, dragOver }))

      // console.log(index, draggingIndex)
      item.index = dragOver
    },
  })
  const [{ isDragging }, dragRef] = useDrag({
    type: 'constructor/listElement',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  dragRef(dropRef(elementRef))

  return (
    <li
      className={style.elementContainer}
      ref={elementRef}
      style={{ opacity: draggingIndex !== index ? 1 : 0.5 }}
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

// export function ListElement({ item, index }) {
//   const dispatch = useDispatch()
//   const elementRef = useRef(null)
//   const [, drop] = useDrop({
//     accept: 'constructor/listElement',
//     collect(monitor) {},
//     hover(item, monitor) {
//       if (!elementRef.current) {
//         return
//       }
//       const elemIndex = item.index
//       const dragOver = index
//       // Don't replace items with themselves
//       if (elemIndex === dragOver) {
//         return
//       }
//       // Determine rectangle on screen
//       const hoverBoundingRect = elementRef.current?.getBoundingClientRect()
//       // Get vertical middle
//       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
//       // Determine mouse position
//       const clientOffset = monitor.getClientOffset()
//       // Get pixels to the top
//       const hoverClientY = clientOffset.y - hoverBoundingRect.top
//       // Only perform the move when the mouse has crossed half of the items height
//       // When dragging downwards, only move when the cursor is below 50%
//       // When dragging upwards, only move when the cursor is above 50%
//       // Dragging downwards
//       if (elemIndex < dragOver && hoverClientY < hoverMiddleY) {
//         return
//       }
//       // Dragging upwards
//       if (elemIndex > dragOver && hoverClientY > hoverMiddleY) {
//         return
//       }
//       // Time to actually perform the action
//       dispatch(moveItem({ elemIndex, dragOver }))
//       item.index = dragOver
//     },
//   })
//   const [{ isDragging }, drag] = useDrag({
//     type: 'constructor/listElement',
//     item: () => {
//       return { index }
//     },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   })
//   drag(drop(elementRef))

//   return (
//     <li className={style.elementContainer} ref={elementRef}>
//       <span className={style.icon}>
//         <DragIcon type="primary" />
//       </span>
//       <ConstructorElement
//         thumbnail={item.image}
//         text={item.name}
//         price={item.price}
//         handleClose={() => dispatch(removeItem(index))}
//       />
//     </li>
//   )
// }
