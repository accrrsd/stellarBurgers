import { createContext, useState } from 'react'
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import Modal from '../modal/modal'
import style from './app.module.css'
import { OrderAcceptedContent, IngredientInfo } from '../modal-content/modal-content'
const ingredientContext = createContext(null)
export { ingredientContext }

export default function App() {
  const [ingredient, setIngredient] = useState(false)
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false)

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false)
    setIngredient(false)
  }
  const handleEscKeydown = (e) => e.key === 'Escape' && closeAllModals()

  return (
    <>
      <AppHeader />
      <div className={style.content}>
        <ingredientContext.Provider value={{ ingredient, setIngredient }}>
          <BurgerIngredients />
          <BurgerConstructor onSubmit={setIsOrderDetailsOpened} />
        </ingredientContext.Provider>
      </div>
      {isOrderDetailsOpened && (
        <Modal onOverlayClick={closeAllModals} onEscDown={handleEscKeydown}>
          <OrderAcceptedContent onSubmit={closeAllModals} />
        </Modal>
      )}
      {ingredient && (
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          onEscDown={handleEscKeydown}
        >
          <IngredientInfo item={ingredient} />
        </Modal>
      )}
    </>
  )
}
