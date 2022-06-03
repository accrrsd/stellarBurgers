import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './app-header.module.css'

export default function AppHeader() {
  return (
    <header className={style.header}>
      <ul className={`${style.leftMenu} ${style.headerList}`}>
        <li>
          <a href="/#" className={`${style.headerLink} ${style.headerLinkActive}`}>
            <BurgerIcon type="primary" /> Конструктор
          </a>
        </li>
        <li>
          <a href="/#" className={style.headerLink}>
            <ListIcon type="secondary" /> Лента заказов
          </a>
        </li>
      </ul>
      <Logo />
      <ul className={`${style.rightMenu} ${style.headerList}`}>
        <li>
          <a href="/#" className={style.headerLink}>
            <ProfileIcon type="secondary" /> Личный кабинет
          </a>
        </li>
      </ul>
    </header>
  )
}
