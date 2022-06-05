import style from './category.module.css'
import { IngredientContext } from '../../app/app'
import { useContext, forwardRef } from 'react'
import CurrentIngredient from '../current-ingredient/current-ingredient'
import propValidate from 'prop-types'

const Category = forwardRef(({ type }, ref) => {
  const { ingredientsData } = useContext(IngredientContext)
  return (
    <li>
      <h3 ref={ref} className={`${style.categoryTitle} text text_type_main-medium`}>
        {type === 'sauce' ? 'Соусы' : type === 'main' ? 'Начинки' : 'Булки'}
      </h3>
      <ul className={style.categoryContent}>
        {ingredientsData.map(
          (item) => item.type === type && <CurrentIngredient item={item} key={item._id} />
        )}
      </ul>
    </li>
  )
})
Category.propTypes = {
  type: propValidate.string.isRequired,
}
export default Category
