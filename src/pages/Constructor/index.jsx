import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BurgerConstructor from '../../components/burger-constructor/burger-constructor'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'
import Modal from '../../components/modal/modal'
import style from './constructor.module.css'
import OrderDetails from '../../components/modal-content/order-details/order-details'
import IngredientDetails from '../../components/modal-content/ingredient-details/ingredient-details'

import { closeIngredientInfo } from '../../services/slices/ingredientDetails'
import { closeOrderDetails } from '../../services/slices/orderDetails'
import { openIngredientInfo } from '../../services/slices/ingredientDetails'
import { useNavigate } from 'react-router-dom'

export default function ConstructorPage() {
  const ingredient = useSelector((store) => store.ingredientDetailsReducer.ingredient)
  const orderDetails = useSelector((store) => store.orderDetailsReducer)
  const ingredientsData = useSelector((store) => store.ingredientsReducer.ingredients)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Логика сохранения открытого модального окна
  const opened = sessionStorage.getItem('openedIngredient')
  useEffect(() => {
    if (opened) {
      const item = JSON.parse(opened)
      opened && dispatch(openIngredientInfo(item))
    }
  }, [opened, dispatch])

  const closeAllModals = () => {
    dispatch(closeOrderDetails())
    dispatch(closeIngredientInfo()) && navigate('/')
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
