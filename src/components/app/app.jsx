import { createContext, useEffect, useState } from 'react'
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import Modal from '../modal/modal'
import style from './app.module.css'
import { OrderDetails, IngredientDetails } from '../modal-content/modal-content'
const dataUrl = 'https://norma.nomoreparties.space/api/ingredients'
const ingredientContext = createContext(null)

export default function App() {
  const [ingredient, setIngredient] = useState(false)
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false)
  const [ingredientsData, setIngredientsData] = useState(false)

  useEffect(() => {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((result) => result.data)
      .then((data) => {
        console.log(data[0])
        return setIngredientsData(data)
      })
      .catch((err) => console.log(err))
  }, [])

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false)
    setIngredient(false)
  }
  const handleEscKeydown = (e) => e.key === 'Escape' && closeAllModals()

  return (
    <>
      <AppHeader />

      {ingredientsData && (
        <div className={style.content}>
          <ingredientContext.Provider value={{ ingredientsData, ingredient, setIngredient }}>
            <BurgerIngredients />
            <BurgerConstructor onSubmit={setIsOrderDetailsOpened} />
          </ingredientContext.Provider>
        </div>
      )}

      {isOrderDetailsOpened && (
        <Modal onOverlayClick={closeAllModals} onEscDown={handleEscKeydown}>
          <OrderDetails onSubmit={closeAllModals} />
        </Modal>
      )}

      {ingredient && (
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          onEscDown={handleEscKeydown}
        >
          <IngredientDetails item={ingredient} />
        </Modal>
      )}
    </>
  )
}
export { ingredientContext }
