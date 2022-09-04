import style from './order-info.module.css'
import { IngredientBorderOverlay } from '../../ingredient-border-overlay/ingredient-border-overlay'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector as useSelector } from '../../../hooks/appHooks'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { TIngredient, TOrder } from '../../../utils/types'

export const OrderInfo = ({ order }: { order: TOrder }) => {
  const selectedOrder = useSelector((store) => store.ordersSliceReducer.openedOrder)
  const currentOrder = structuredClone(order || selectedOrder) as TOrder

  // Подсчет общей стоимости
  const orderCost = currentOrder.ingredients.reduce(
    (cost: number, ingredient: TIngredient) => cost + ingredient.price,
    0
  )

  const uniqueIngredients = currentOrder.ingredients.reduce((newArr: TIngredient[], ingredient) => {
    // Проставляем начальные числа
    ingredient.count = 1

    // Находит элемент в результирующем массиве, который уже в нем был
    const findRes = newArr.findIndex((elem: TIngredient) => elem._id === ingredient._id)
    // Если нашли, увеличиваем количество на 1
    if (findRes !== -1) {
      newArr[findRes].count! += 1
    }
    // Если не нашли, то добавляем в результирующий массив
    else {
      newArr.push(ingredient)
    }

    return newArr
  }, [])

  return (
    <div className={style.wrapper}>
      <div className={style.topWrapper}>
        <h3 className={style.title}>{currentOrder.name}</h3>
        <span
          className={`${style.status} ${
            (currentOrder.status === 'done' && style.statusDone) ||
            (currentOrder.status === 'canceled' && style.statusDeny)
          }`}
        >
          {(currentOrder.status === 'done' && 'Выполнен') ||
            (currentOrder.status === 'canceled' && 'Отменен') ||
            (currentOrder.status === 'pending' && 'В работе')}
        </span>
      </div>

      <div className={style.compound}>
        <h4 className={style.compoundTitle}>Состав:</h4>
        <ul className={style.list}>
          {uniqueIngredients.map((ingredient) => (
            <li className={style.listItem} key={uuidv4()}>
              <div className={style.ingredientWrapper}>
                <IngredientBorderOverlay background={ingredient.image} />
                <span className={style.ingredientName}>{ingredient.name}</span>
              </div>

              <span className={`text text_type_digits-default ${style.numberIcon}`}>
                {ingredient.count} x {ingredient.price}
                <CurrencyIcon type="primary" />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.bottomWrapper}>
        <span className={style.updatedAt}>
          {dayjs(currentOrder.updatedAt).format(`ddd, HH:mm iZ`)}
        </span>
        <span className={`text text_type_digits-default ${style.numberIcon}`}>
          {orderCost}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  )
}
