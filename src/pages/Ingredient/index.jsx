import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import IngredientDetails from '../../components/modal-content/ingredient-details/ingredient-details'
import ConstructorPage from '../Constructor'
import style from './Ingredient.module.css'

export default function IngredientPage() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [formPage, setFormPage] = useState(false)
  const allIngredients = useSelector((store) => store.ingredientsReducer.ingredients)

  // Если пришли не с модального окна - открываем страницу

  const modalState = sessionStorage.getItem('openedIngredient')

  useEffect(() => {
    if (!modalState) {
      setFormPage('ingredient')
    } else {
      setFormPage('modal')
    }
  }, [dispatch, modalState, id])

  if (formPage === 'ingredient' && allIngredients) {
    const current = allIngredients.filter((ingredient) => ingredient._id === id)[0]
    return (
      <div className={style.wrapper}>
        <h4 className={style.title}>Детали ингредиента</h4>
        <IngredientDetails givenItem={current} />
      </div>
    )
  }

  if (formPage === 'modal') {
    return <ConstructorPage />
  }
}
