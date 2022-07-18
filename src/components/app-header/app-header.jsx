import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './app-header.module.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function AppHeader() {
  const [activeLink, setActiveLink] = useState('constructor')
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
            to="/orders"
            className={() => checkActive('orders', true)}
            onClick={() => setActiveLink('orders')}
          >
            <ListIcon type={`${checkActive('orders')}`} /> Лента заказов
          </NavLink>
        </li>
      </ul>
      <Logo />
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
