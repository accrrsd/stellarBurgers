import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import IngredientDetails from '../../components/modal-content/ingredient-details/ingredient-details'
import { getIngredients } from '../../services/slices/ingredients'
import style from './Ingredient.module.css'

export default function IngredientPage() {
  const dispatch = useDispatch()
  const location = useLocation()
  const prevPage = location.state?.from?.pathname
  const { id } = useParams()
  const allIngredients = useSelector((store) => store.ingredientsReducer.ingredients)

  // Если пришли не с модального окна - открываем страницу
  useEffect(() => {
    if (prevPage !== '/') {
      dispatch(getIngredients())
    }
  }, [dispatch, prevPage, id])

  if (allIngredients) {
    const current = allIngredients.filter((ingredient) => ingredient._id === id)[0]
    return (
      <div className={style.wrapper}>
        <h4 className={style.title}>Детали ингредиента</h4>
        <IngredientDetails givenItem={current} />
      </div>
    )
  }
}
