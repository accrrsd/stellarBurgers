import style from './tape-card.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientBorderOverlay } from '../../ingredient-border-overlay/ingredient-border-overlay'
import { v4 as uuidv4 } from 'uuid'
import propValidate from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { openOrder } from '../../../services/slices/orders'

export const TapeCard = ({ number, id, name, ingredients, date, price, type, status }) => {
  const imagesArr = ingredients?.map((ingredient) => ingredient.image_mobile) || false

  const props = { number, _id: id, name, ingredients, date, price, type, status }

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const handleClick = () => {
    if (type === 'profile') {
      // dispatch(openOrderInfo({ number, name, ingredients, date, price, type, status }))
      navigate(`/profile/orders/${id}`, { state: { background: location } })
    } else if (type === 'feed') {
      navigate(`/feed/${id}`, { state: { background: location } })
    }
    dispatch(openOrder(props))
    sessionStorage.setItem('openedOrder', JSON.stringify(props))
  }

  return (
    <div className={style.cardWrapper} onClick={handleClick}>
      <div className={style.cardTopWrapper}>
        <span className={style.cardId}>#{number}</span>
        <span className={style.cardDate}>{dayjs(date).format(`ddd, HH:mm iZ`)}</span>
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

TapeCard.propTypes = {
  number: propValidate.oneOfType([propValidate.number, propValidate.string]).isRequired,
  id: propValidate.oneOfType([propValidate.number, propValidate.string]).isRequired,
  name: propValidate.string.isRequired,
  ingredients: propValidate.oneOfType([propValidate.array, propValidate.bool]),
  date: propValidate.any.isRequired,
  price: propValidate.oneOfType([propValidate.number, propValidate.string]).isRequired,
  type: propValidate.string,
  status: propValidate.string,
}
