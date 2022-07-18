import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BurgerConstructor from '../../components/burger-constructor/burger-constructor'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'
import Modal from '../../components/modal/modal'
import style from './constructor.module.css'
import OrderDetails from '../../components/modal-content/order-details/order-details'
import IngredientDetails from '../../components/modal-content/ingredient-details/ingredient-details'

import { getIngredients } from '../../services/slices/ingredients'
import { closeIngredientInfo } from '../../services/slices/ingredientDetails'
import { closeOrderDetails } from '../../services/slices/orderDetails'

export default function ConstructorPage() {
  const ingredient = useSelector((store) => store.ingredientDetailsReducer.ingredient)
  const orderDetails = useSelector((store) => store.orderDetailsReducer)
  const ingredientsData = useSelector((store) => store.ingredientsReducer.ingredients)

  const dispatch = useDispatch()

  useEffect(() => {
    !ingredientsData && dispatch(getIngredients())
  }, [dispatch, ingredientsData])

  const closeAllModals = () => {
    dispatch(closeOrderDetails())
    dispatch(closeIngredientInfo())
  }
  return (
    <>
      {ingredientsData && (
        <div className={style.content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      )}
      {/* Если запрос вообще был проведен */}
      {orderDetails.success !== null && (
        <Modal onEscKeyDown={closeAllModals}>
          <OrderDetails onSubmit={closeAllModals} />
        </Modal>
      )}

      {ingredient && (
        <Modal title="Детали ингредиента" onEscKeyDown={closeAllModals}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  )
}
