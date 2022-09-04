import style from './ingredient-border-overlay.module.css'

type TProps = { background: string; num?: string | number | boolean }

export const IngredientBorderOverlay = ({ background, num }: TProps): JSX.Element => {
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
