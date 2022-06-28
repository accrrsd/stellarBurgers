import { useEffect, createRef } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import propValidate from 'prop-types'
import style from './burger-constructor.module.css'
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { changeValue, addItem, changeSideBun } from '../../services/slices/constructorList'
import { getOrderDetails } from '../../services/slices/orderDetails'
import { ListElement, PhantomListElement } from './list-element/list-element'

export default function BurgerConstructor() {
  const ingredientsData = useSelector((store) => store.ingredientsReducer.ingredients)
  const previewRef = createRef(null)
  const dispatch = useDispatch()

  const constructorItems = useSelector((store) => store.constructorReducer.items)
  const constructorValue = useSelector((store) => store.constructorReducer.value)

  const sideBun = useSelector((store) => store.constructorReducer.sideBun)

  const createOrder = () => dispatch(getOrderDetails(constructorItems.map((item) => item._id)))

  const [{ mainOpacity, bunOpacity, elemHover }, dropTarget] = useDrop({
    accept: ['ingredient/sauce', 'ingredient/main', 'ingredient/bun'],
    drop(item, monitor) {
      dispatch(monitor.getItemType() === 'ingredient/bun' ? changeSideBun(item) : addItem(item))
    },
    collect: (monitor) => ({
      bunOpacity: monitor.getItemType() === 'ingredient/bun' ? 0.5 : 1,
      mainOpacity:
        monitor.getItemType() === 'ingredient/sauce' || monitor.getItemType() === 'ingredient/main'
          ? 0.5
          : 1,
      elemHover:
        monitor.isOver() &&
        (monitor.getItemType() === 'ingredient/sauce' ||
          monitor.getItemType() === 'ingredient/main')
          ? monitor.getItem()
          : false,
    }),
  })

  //Булки по умолчанию
  useEffect(() => {
    dispatch(changeSideBun(ingredientsData.find((item) => item.type === 'bun')))
    // eslint-disable-next-line
  }, [])

  // Подсчет стоимости бургера
  useEffect(() => {
    const items = constructorItems.reduce((sum, item) => sum + item.price, 0)
    dispatch(changeValue(items + sideBun.price * 2 + (elemHover ? elemHover.price : 0)))
    // eslint-disable-next-line
  }, [constructorItems, sideBun, elemHover])

  // Скроллим для превью нового ингредиента
  useEffect(() => {
    elemHover && previewRef.current.scrollIntoView()
  }, [elemHover, previewRef])

  return (
    <div className={style.wrapper} ref={dropTarget}>
      <div className={style.elementWrapper} style={{ opacity: bunOpacity }}>
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
          <ListElement item={item} index={index} key={index} blackoutOpacity={mainOpacity} />
        ))}
        {elemHover && (
          <PhantomListElement item={elemHover} key={constructorItems.length + 1} ref={previewRef} />
        )}
      </ul>
      <div className={style.elementWrapper} style={{ opacity: bunOpacity }}>
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
