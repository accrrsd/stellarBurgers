import { useEffect, createRef } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { refreshToken } from '../../services/slices/profile'
import style from './burger-constructor.module.css'
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { v4 as uuidv4 } from 'uuid'

import emptySpace from '../../images/transparent.png'

import {
  changeValue,
  addItem,
  changeSideBun,
  initItems,
} from '../../services/slices/constructorList'
import { getOrderDetails } from '../../services/slices/orderDetails'
import { ListElement, PhantomListElement } from './list-element/list-element'
import { useLocation, useNavigate } from 'react-router-dom'

export default function BurgerConstructor() {
  const navigate = useNavigate()
  const location = useLocation()

  const previewRef = createRef(null)
  const dispatch = useDispatch()

  const constructorItems = useSelector((store) => store.constructorReducer.items)
  const constructorValue = useSelector((store) => store.constructorReducer.value)
  const auth = useSelector((store) => store.profileReducer.loginState)

  const sideBun = useSelector((store) => store.constructorReducer.sideBun)

  const createOrder = () => {
    if (auth) {
      const concats = constructorItems.map((item) => item._id).concat(sideBun._id, sideBun._id)
      dispatch(
        getOrderDetails(concats).then(
          (data) =>
            data.meta.requestStatus === 'rejected' &&
            dispatch(refreshToken()).then(() => {
              dispatch(getOrderDetails(concats))
            })
        )
      )
      dispatch(initItems([]))
      dispatch(changeSideBun(false))
    } else {
      navigate('/login', { state: { from: location } })
    }
  }

  const createUuid = (obj) => {
    const newObj = structuredClone(obj)
    newObj.uuid = uuidv4()
    return newObj
  }

  const [{ mainOpacity, bunOpacity, elemHover }, dropTarget] = useDrop({
    accept: ['ingredient/sauce', 'ingredient/main', 'ingredient/bun'],
    drop(item, monitor) {
      const newItem = createUuid(item)
      dispatch(
        monitor.getItemType() === 'ingredient/bun' ? changeSideBun(newItem) : addItem(newItem)
      )
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

  // Подсчет стоимости бургера
  useEffect(() => {
    const items = constructorItems.reduce((sum, item) => sum + item.price, 0)
    dispatch(changeValue(items + (sideBun.price || 0) * 2 + (elemHover.price || 0)))
    // eslint-disable-next-line
  }, [constructorItems, sideBun, elemHover])

  // Создаем уникальный идентификатор для ховер ингредиента
  let copyElemHover = false
  useEffect(() => {
    if (elemHover) {
      // eslint-disable-next-line
      copyElemHover = createUuid(elemHover)
    }
    // Скроллим для превью нового ингредиента
    elemHover && previewRef.current.scrollIntoView()
  }, [elemHover, previewRef])

  return (
    <div className={style.wrapper} ref={dropTarget}>
      <div className={style.elementWrapper} style={{ opacity: bunOpacity }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={sideBun ? `${sideBun.name} (верх)` : 'Перетащите булку и ингредиенты'}
          price={sideBun.price || false}
          thumbnail={sideBun.image || emptySpace}
        />
      </div>
      <ul className={style.container}>
        {constructorItems.map((item, index) => (
          <ListElement item={item} index={index} key={item.uuid} blackoutOpacity={mainOpacity} />
        ))}
        {elemHover && (
          <PhantomListElement
            item={elemHover}
            key={copyElemHover && copyElemHover.uuid}
            ref={previewRef}
          />
        )}
      </ul>
      <div className={style.elementWrapper} style={{ opacity: bunOpacity }}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={sideBun ? `${sideBun.name} (низ)` : 'Перетащите булку и ингредиенты'}
          price={sideBun.price || false}
          thumbnail={sideBun.image || emptySpace}
        />
      </div>
      <div className={style.bottomContainer}>
        <span className={`${style.bottomCounter} text text_type_digits-medium`}>
          {constructorValue}
          <CurrencyIcon type="primary" />
        </span>
        <Button
          type="primary"
          size="large"
          onClick={createOrder}
          disabled={!sideBun || constructorItems.length === 0}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}
