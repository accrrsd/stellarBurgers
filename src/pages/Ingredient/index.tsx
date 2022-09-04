import { useAppSelector as useSelector } from '../../hooks/appHooks'
import { useParams } from 'react-router-dom'
import IngredientDetails from '../../components/modal-content/ingredient-details/ingredient-details'
import style from './Ingredient.module.css'

export default function IngredientPage(): JSX.Element | null {
  const { id } = useParams()
  const allIngredients = useSelector((store) => store.ingredientsReducer.ingredients)

  if (allIngredients) {
    const current = allIngredients.filter((ingredient) => ingredient._id === id)[0]
    return (
      <div className={style.wrapper}>
        <h4 className={style.title}>Детали ингредиента</h4>
        <IngredientDetails givenItem={current} />
      </div>
    )
  } else {
    return null
  }
}
