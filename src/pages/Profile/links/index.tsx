import style from './links.module.css'
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  useAppDispatch as useDispatch,
  useAppSelector as useSelector,
} from '../../../hooks/appHooks'
import { logout } from '../../../services/slices/profile'

export default function Links() {
  const dispatch = useDispatch()
  const [activeLink, setActiveLink] = useState('profile')
  const refreshToken = useSelector((store) => store.profileReducer.refreshToken)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/profile/orders') {
      setActiveLink('orders')
    } else if (location.pathname === '/profile') {
      setActiveLink('profile')
    }
  }, [location])

  const handleLogOut = () => {
    setActiveLink('exit')
    dispatch(logout({ token: refreshToken }))
  }

  const checkActiveClass = (str: string) =>
    activeLink === str ? `${style.link} ${style.linkActive}` : style.link

  return (
    <div className={style.linksWrapper}>
      <ul className={style.list}>
        <li className={style.item}>
          <NavLink
            to="/profile"
            className={() => checkActiveClass('profile')}
            onClick={() => setActiveLink('profile')}
          >
            <span className={style.itemText}>Профиль</span>
          </NavLink>
        </li>
        <li className={style.item}>
          <NavLink
            to="/profile/orders"
            className={() => checkActiveClass('orders')}
            onClick={() => setActiveLink('orders')}
          >
            <span className={style.itemText}>История заказов</span>
          </NavLink>
        </li>
        <li className={style.item}>
          <NavLink to="#" className={() => checkActiveClass('exit')} onClick={handleLogOut}>
            <span className={style.itemText}>Выход</span>
          </NavLink>
        </li>
      </ul>
      <p className={style.linksSubline}>
        {activeLink === 'profile' && 'В этом разделе вы можете изменить свои персональные данные'}
        {activeLink === 'orders' && 'В этом разделе вы можете просмотреть свою историю заказов'}
      </p>
    </div>
  )
}
