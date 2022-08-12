import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './app-header.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function AppHeader() {
  const [activeLink, setActiveLink] = useState('constructor')
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    if (path === '/') {
      setActiveLink('constructor')
    } else if (path === '/feed') {
      setActiveLink('feed')
    } else if (path === '/profile' || path === 'login') {
      setActiveLink('profile')
    }
  }, [location])

  const checkActive = (str, forLink) =>
    //prettier-ignore
    activeLink===str? (forLink? `${style.headerLink} ${style.headerLinkActive}`:'primary') : (forLink? style.headerLink : 'secondary')

  return (
    <header className={style.header}>
      <ul className={`${style.leftMenu} ${style.headerList}`}>
        <li>
          <NavLink
            to="/"
            className={() => checkActive('constructor', true)}
            onClick={() => setActiveLink('constructor')}
          >
            <BurgerIcon type={`${checkActive('constructor')}`} /> Конструктор
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/feed"
            className={() => checkActive('feed', true)}
            onClick={() => setActiveLink('feed')}
          >
            <ListIcon type={`${checkActive('feed')}`} /> Лента заказов
          </NavLink>
        </li>
      </ul>
      <NavLink to="/" onClick={() => setActiveLink('constructor')} className={style.logoWrapper}>
        <Logo />
      </NavLink>
      <ul className={`${style.rightMenu} ${style.headerList}`}>
        <li>
          <NavLink
            to="/profile"
            className={() => checkActive('profile', true)}
            onClick={() => setActiveLink('profile')}
          >
            <ProfileIcon type={`${checkActive('profile')}`} /> Личный кабинет
          </NavLink>
        </li>
      </ul>
    </header>
  )
}
