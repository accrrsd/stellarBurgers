import style from './orders-tape.module.css'
import { useAppSelector as useSelector } from '../../hooks/appHooks'
import { v4 as uuidv4 } from 'uuid'
import { TapeCard } from './tape-card/tape-card'
import { TIngredient, TMutableOrder } from '../../utils/types'

export const OrdersTape = ({ type, orders }: { type: string; orders: TMutableOrder[] }) => {
  const ingredients = useSelector((store) => store.ingredientsReducer.ingredients)

  if (ingredients)
    return (
      <div className={style.wrapper}>
        {orders?.map((order: TMutableOrder) => {
          const currentIngredients = order.ingredients.reduce(
            (res: TIngredient[], orderIngredient: string) => {
              const found = ingredients.find((ingredient) => ingredient._id === orderIngredient)
              return found ? [...res, found] : res
            },
            []
          )

          const orderPrice = currentIngredients!.reduce(
            (total, ingredient) => total + ingredient.price,
            0
          )

          return (
            <TapeCard
              number={order.number}
              _id={order._id}
              updatedAt={order.updatedAt}
              name={order.name}
              status={order.status}
              price={orderPrice}
              ingredients={currentIngredients}
              type={type}
              key={uuidv4()}
            />
          )
        })}
      </div>
    )
  else return null
}
