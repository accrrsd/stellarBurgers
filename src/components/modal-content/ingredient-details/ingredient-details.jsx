import style from './ingredient-details.module.css'
import '../../../fonts/jetBrainsFont.css'
import { ingredientForDetailsModal } from '../../../utils/propTypesSettings'

const IngredientDetails = ({ item }) => {
  return (
    <div className={style.wrapper}>
      <img src={item.image} alt={item.name} className={style.image} />
      <span className={style.name}>{item.name}</span>
      <ul className={style.dataWrapper}>
        <li>
          <p className={style.dataItem}>
            <span>Калории,ккал</span>
            <span> {item.calories ? item.calories : '?'}</span>
          </p>
        </li>
        <li>
          <p className={style.dataItem}>
            <span>Белки, г</span>
            <span> {item.proteins ? item.proteins : '?'}</span>
          </p>
        </li>
        <li>
          <p className={style.dataItem}>
            <span>Жиры, г</span>
            <span> {item.fat ? item.fat : '?'}</span>
          </p>
        </li>
        <li>
          <p className={style.dataItem}>
            <span>Углеводы, г</span>
            <span> {item.carbohydrates ? item.carbohydrates : '?'}</span>
          </p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = ingredientForDetailsModal

export default IngredientDetails
