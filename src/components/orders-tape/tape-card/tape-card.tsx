import style from './tape-card.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientBorderOverlay } from '../../ingredient-border-overlay/ingredient-border-overlay'
import { v4 as uuidv4 } from 'uuid'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch as useDispatch } from '../../../hooks/appHooks'
import dayjs from 'dayjs'
import { openOrder } from '../../../services/slices/orders'
import { TOrder } from '../../../utils/types'

export const TapeCard = ({
  number,
  _id,
  name,
  ingredients,
  updatedAt,
  price,
  type,
  status,
}: TOrder & { type: string }) => {
  const imagesArr = ingredients?.map((ingredient) => ingredient.image_mobile) || false

  const props = { number, _id, name, ingredients, updatedAt, price, type, status }

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const handleClick = () => {
    if (type === 'profile') {
      navigate(`/profile/orders/${_id}`, { state: { background: location } })
    } else if (type === 'feed') {
      navigate(`/feed/${_id}`, { state: { background: location } })
    }
    dispatch(openOrder(props))
    sessionStorage.setItem('openedOrder', JSON.stringify(props))
  }

  return (
    <div className={style.cardWrapper} onClick={handleClick}>
      <div className={style.cardTopWrapper}>
        <span className={style.cardId}>#{number}</span>
        <span className={style.cardDate}>{dayjs(updatedAt).format(`ddd, HH:mm iZ`)}</span>
      </div>
      {type === 'profile' && (
        <div className={style.profileCardMiddleWrapper}>
          <h4 className={style.cardName}>{name}</h4>
          <span
            className={`${style.profileCardStatus} ${
              (status === 'done' && style.profileCardStatusDone) ||
              (status === 'canceled' && style.profileCardStatusDeny)
            }`}
          >
            {(status === 'done' && 'Выполнен') ||
              (status === 'canceled' && 'Отменен') ||
              (status === 'pending' && 'В работе')}
          </span>
        </div>
      )}
      {type !== 'profile' && <h4 className={style.cardName}>{name}</h4>}
      <div className={style.cardBottomWrapper}>
        <div className={style.cardImagesWrapper}>
          {imagesArr &&
            imagesArr.map(
              (img, index) =>
                index < 5 && (
                  <div className={style.cardImage} key={uuidv4()} style={{ zIndex: 5 - index }}>
                    <IngredientBorderOverlay
                      background={img}
                      num={imagesArr.length > 5 && index === 4 ? imagesArr.length - 5 : false}
                    />
                  </div>
                )
            )}
        </div>
        <span className={`${style.cardPrice} text text_type_digits-default`}>
          <CurrencyIcon type="primary" />
          {price}
        </span>
      </div>
    </div>
  )
}
