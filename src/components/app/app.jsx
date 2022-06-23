import { createContext, useEffect, useState } from 'react'
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import Modal from '../modal/modal'
import style from './app.module.css'
import OrderDetails from '../modal-content/order-details/order-details'
import IngredientDetails from '../modal-content/ingredient-details/ingredient-details'
import ModalOverlay from '../modal-overlay/modal-overlay'

import { getFromApi } from '../../utils/api'
const IngredientContext = createContext(null)
const ConstructorContext = createContext(null)

export default function App() {
  const [ingredient, setIngredient] = useState(false)
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false)
  const [ingredientsData, setIngredientsData] = useState(false)
  const [constructorItems, setConstructorItems] = useState([])

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
      <ConstructorContext.Provider value={{ constructorItems, setConstructorItems }}>
        {ingredientsData && (
          <div className={style.content}>
            <IngredientContext.Provider value={{ ingredientsData, ingredient, setIngredient }}>
              <BurgerIngredients />
              <BurgerConstructor onSubmit={setIsOrderDetailsOpened} />
            </IngredientContext.Provider>
          </div>
        )}

        {isOrderDetailsOpened && (
          <>
            <Modal onEscKeyDown={closeAllModals}>
              <OrderDetails onSubmit={closeAllModals} />
            </Modal>
            <ModalOverlay onClick={closeAllModals} />
          </>
        )}
      </ConstructorContext.Provider>

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
export { IngredientContext, ConstructorContext }
