import style from './orders-tape.module.css'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import propValidate from 'prop-types'
import { TapeCard } from './tape-card/tape-card'

export const OrdersTape = ({ width, height, type, orders }) => {
  const ingredients = useSelector((store) => store.ingredientsReducer.ingredients)

  return (
    <div
      className={style.wrapper}
      style={{ width: width && `${width}px`, maxHeight: height && `${height}px` }}
    >
      {orders?.map((order) => {
        const currentIngredients =
          ingredients &&
          order.ingredients.reduce((res, orderIngredient) => {
            const found = ingredients.find((ingredient) => ingredient._id === orderIngredient)
            return found ? [...res, found] : res
          }, [])

        const orderPrice = currentIngredients.reduce(
          (total, ingredient) => total + ingredient.price,
          0
        )

        return (
          <TapeCard
            number={order.number}
            id={order._id}
            date={order.updatedAt}
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
}

OrdersTape.propTypes = {
  width: propValidate.number,
  height: propValidate.number,
  type: propValidate.string,
  orders: propValidate.oneOfType([propValidate.array, propValidate.bool]),
}
