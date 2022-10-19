import style from './order.module.css'

import { OrderInfo } from '../../components/modal-content/order-info/order-info'
import { useAppSelector as useSelector } from '../../hooks/appHooks'
import { useParams } from 'react-router-dom'

type TOrderProps = {
  type?: string | boolean
}

export default function Order({ type }: TOrderProps): JSX.Element | null {
  const { id } = useParams()
  const ingredients = useSelector((store) => store.ingredientsReducer.ingredients)

  const order = useSelector((store) =>
    type === 'profile'
      ? store.ordersSliceReducer.userOrders?.orders
      : store.ordersSliceReducer.allOrders?.orders
  )?.find((order) => String(order._id) === id)

  if (order && ingredients) {
    const currentIngredients = order.ingredients.map((orderIngredient) =>
      ingredients.find((ingredient) => ingredient._id === orderIngredient)
    )

    const resultOrder = structuredClone(order)
    resultOrder.ingredients = currentIngredients

    return (
      <div className={style.wrapper}>
        <h3 className={style.title}>#{resultOrder.number}</h3>
        <OrderInfo order={resultOrder} />
      </div>
    )
  } else {
    return null
  }
}
