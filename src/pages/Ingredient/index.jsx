import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import IngredientDetails from '../../components/modal-content/ingredient-details/ingredient-details'
import style from './Ingredient.module.css'

export default function IngredientPage() {
  const { id } = useParams()
  const allIngredients = useSelector((store) => store.ingredientsReducer.ingredients)

  const current = allIngredients.filter((ingredient) => ingredient._id === id)[0]
  return (
    <div className={style.wrapper}>
      <h4 className={style.title}>Детали ингредиента</h4>
      <IngredientDetails givenItem={current} />
    </div>
  )
}
