import { forwardRef } from 'react'
import { useAppSelector as useSelector } from '../../../hooks/appHooks'

import style from './category.module.css'
import CurrentIngredient from '../current-ingredient/current-ingredient'

type TTabsName = 'sauce' | 'bun' | 'main'

const Category = forwardRef<HTMLHeadingElement, { type: TTabsName }>(({ type }, ref) => {
  const ingredientsData = useSelector((store) => store.ingredientsReducer.ingredients)
  return (
    <li>
      <h3 ref={ref} className={`${style.categoryTitle} text text_type_main-medium`}>
        {type === 'sauce' ? 'Соусы' : type === 'main' ? 'Начинки' : 'Булки'}
      </h3>
      <ul className={style.categoryContent}>
        {ingredientsData?.map(
          (item) => item.type === type && <CurrentIngredient item={item} key={item._id} />
        )}
      </ul>
    </li>
  )
})

export default Category
