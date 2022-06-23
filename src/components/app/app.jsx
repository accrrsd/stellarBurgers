import { useEffect, useState } from 'react'

import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import Modal from '../modal/modal'
import style from './app.module.css'
import OrderDetails from '../modal-content/order-details/order-details'
import IngredientDetails from '../modal-content/ingredient-details/ingredient-details'
import ModalOverlay from '../modal-overlay/modal-overlay'

import { getFromApi } from '../../utils/api'
import { IngredientContext } from '../../services/contexts'

export default function App() {
  const [ingredient, setIngredient] = useState(false)
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false)
  const [ingredientsData, setIngredientsData] = useState(false)
  const [orderInfo, setOrderInfo] = useState(false)

  useEffect(() => {
    getFromApi('ingredients').then((data) => setIngredientsData(data))
  }, [])

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false)
    setIngredient(false)
  }
  return (
    <>
      <AppHeader />
      {ingredientsData && (
        <div className={style.content}>
          <IngredientContext.Provider value={{ ingredientsData, ingredient, setIngredient }}>
            <BurgerIngredients />
            <BurgerConstructor setOrderInfo={setOrderInfo} onSubmit={setIsOrderDetailsOpened} />
          </IngredientContext.Provider>
        </div>
      )}

      {isOrderDetailsOpened && (
        <>
          <Modal onEscKeyDown={closeAllModals}>
            <OrderDetails orderInfo={orderInfo} onSubmit={closeAllModals} />
          </Modal>
          <ModalOverlay onClick={closeAllModals} />
        </>
      )}

      {ingredient && (
        <>
          <Modal title="Детали ингредиента" onEscKeyDown={closeAllModals}>
            <IngredientDetails item={ingredient} />
          </Modal>
          <ModalOverlay onClick={closeAllModals} />
        </>
      )}
    </>
  )
}
