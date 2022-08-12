import style from './ingredient-border-overlay.module.css'
import propValidate from 'prop-types'

export const IngredientBorderOverlay = ({ background, num }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.borders}>
        <div className={style.overlay}>
          <div className={style.image} style={{ backgroundImage: `url(${background})` }}>
            {num && <span className={style.number}>+{num}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

IngredientBorderOverlay.propTypes = {
  background: propValidate.string,
  num: propValidate.oneOfType([propValidate.string, propValidate.number, propValidate.bool]),
}
