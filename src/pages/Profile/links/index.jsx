import style from './links.module.css'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../services/slices/profile'

export default function Links() {
  const dispatch = useDispatch()
  const [activeLink, setActiveLink] = useState('profile')
  const refreshToken = useSelector((store) => store.profileReducer.refreshToken)
  const handleLogOut = () => {
    setActiveLink('exit')
    dispatch(logout({ token: refreshToken }))
  }

  const checkActive = (str, forLink) =>
    //prettier-ignore
    activeLink===str? (forLink? `${style.link} ${style.linkActive}`:'primary') : (forLink? style.link : 'secondary')

  return (
    <ul className={style.list}>
      <li className={style.item}>
        <NavLink
          to="#"
          className={() => checkActive('profile', true)}
          onClick={() => setActiveLink('profile')}
        >
          <span className={style.itemText}>Профиль</span>
        </NavLink>
      </li>
      <li className={style.item}>
        <NavLink
          to="orders/:id"
          className={() => checkActive('history', true)}
          onClick={() => setActiveLink('history')}
        >
          <span className={style.itemText}>История заказов</span>
        </NavLink>
      </li>
      <li className={style.item}>
        <NavLink to="#" className={() => checkActive('exit', true)} onClick={handleLogOut}>
          <span className={style.itemText}>Выход</span>
        </NavLink>
      </li>
    </ul>
  )
}
