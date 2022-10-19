import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './app-header.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function AppHeader(): JSX.Element {
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

  // prettier-ignore
  const checkActiveClass = (str: string) => activeLink === str ? `${style.headerLink} ${style.headerLinkActive}` : style.headerLink
  const checkActiveType = (str: string) => (activeLink === str ? 'primary' : 'secondary')

  return (
    <header className={style.header}>
      <ul className={`${style.leftMenu} ${style.headerList}`}>
        <li>
          <NavLink
            to="/"
            className={() => checkActiveClass('constructor')}
            onClick={() => setActiveLink('constructor')}
          >
            <BurgerIcon type={`${checkActiveType('constructor')}`} /> Конструктор
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/feed"
            className={() => checkActiveClass('feed')}
            onClick={() => setActiveLink('feed')}
          >
            <ListIcon type={`${checkActiveType('feed')}`} /> Лента заказов
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
            className={() => checkActiveClass('profile')}
            onClick={() => setActiveLink('profile')}
          >
            <ProfileIcon type={`${checkActiveType('profile')}`} /> Личный кабинет
          </NavLink>
        </li>
      </ul>
    </header>
  )
}
