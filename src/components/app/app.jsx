import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import Modal from '../modal/modal'
import style from './app.module.css'
import OrderDetails from '../modal-content/order-details/order-details'
import IngredientDetails from '../modal-content/ingredient-details/ingredient-details'
import ModalOverlay from '../modal-overlay/modal-overlay'

import { getIngredients } from '../../services/slices/ingredients'
import { closeIngredientInfo } from '../../services/slices/ingredientDetails'
import { closeOrderDetails } from '../../services/slices/orderDetails'

export default function App() {
  const ingredient = useSelector((store) => store.ingredientDetailsReducer.ingredient)
  const orderDetails = useSelector((store) => store.orderDetailsReducer)
  const ingredientsData = useSelector((store) => store.ingredientsReducer.ingredients)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  const closeAllModals = () => {
    dispatch(closeOrderDetails())
    dispatch(closeIngredientInfo())
  }
  return (
    <>
      <AppHeader />
      {ingredientsData && (
        <div className={style.content}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      )}
      {/* Если запрос вообще был проведен */}
      {orderDetails.success !== null && (
        <>
          <Modal onEscKeyDown={closeAllModals}>
            <OrderDetails onSubmit={closeAllModals} />
          </Modal>
          <ModalOverlay onClick={closeAllModals} />
        </>
      )}

      {ingredient && (
        <>
          <Modal title="Детали ингредиента" onEscKeyDown={closeAllModals}>
            <IngredientDetails />
          </Modal>
          <ModalOverlay onClick={closeAllModals} />
        </>
      )}
    </>
  )
}
