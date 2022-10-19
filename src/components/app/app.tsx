// import style from './app.module.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch as useDispatch } from '../../hooks/appHooks'

import { ProtectedRoutes } from '../protected-routes/protected-routes'
import { checkAuth } from '../../services/slices/profile'
import { getIngredients } from '../../services/slices/ingredients'
import { getCookie } from '../../utils/cookie'
import { setAllOrders, setUserOrders } from '../../services/slices/orders'
import { useSocket } from '../../hooks/useSocket'

import Constructor from '../../pages/Constructor'
import Profile from '../../pages/Profile'
import Feed from '../../pages/Feed/index'
import AppHeader from '../app-header/app-header'
import Login from '../../pages/login'
import Register from '../../pages/register'
import ForgotPassword from '../../pages/forgot-password'
import ResetPassword from '../../pages/reset-password'
import OrderPage from '../../pages/order'
import IngredientPage from '../../pages/Ingredient/index'

import dayjs from 'dayjs'
import { TLocation } from '../../utils/types'
require('dayjs/locale/ru')
dayjs.locale('ru')

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null
  }
}

export default function App() {
  const dispatch = useDispatch()
  const location = useLocation() as TLocation
  const background = location.state?.background

  type TSocket = {
    connect: (token?: string) => void
    sendData: (message: any) => void
    close: (e?: CloseEvent) => void
  }

  const onMessageFeed = (e: MessageEvent) => dispatch(setAllOrders(JSON.parse(e.data)))
  const onMessageProfile = (e: MessageEvent) => dispatch(setUserOrders(JSON.parse(e.data)))

  const feedSocket: TSocket = useSocket('wss://norma.nomoreparties.space/orders/all', {
    onMessage: onMessageFeed,
  })

  const profileSocket: TSocket = useSocket('wss://norma.nomoreparties.space/orders', {
    onMessage: onMessageProfile,
  })

  // Проверка на локацию для открытия/закрытия потока
  useEffect(() => {
    if (location.pathname.includes('/feed') && feedSocket) {
      feedSocket.connect()
    } else if (location.pathname.includes('/profile') && profileSocket) {
      const cookie = getCookie('access')
      if (cookie) {
        profileSocket.connect(cookie)
      }
    }
    // Проверка на закрытие потока
    else if (!location.pathname.includes('/feed') && feedSocket) {
      feedSocket.close()
    } else if (!location.pathname.includes('/profile') && profileSocket) {
      profileSocket.close()
    }
    // eslint-disable-next-line
  }, [location.pathname])

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(getIngredients())
    // eslint-disable-next-line
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <Routes location={background ?? location}>
        <Route path="/" element={<Constructor />} />
        <Route path="/feed" element={<Feed />} />

        <Route path="/feed/:id" element={<OrderPage />} />
        {background && <Route path="/feed/:id" element={<></>} />}

        <Route path="/ingredients/:id" element={<IngredientPage />} />
        {background && <Route path="/ingredients/:id" element={<></>} />}

        {/* Защита от не авторизованного */}
        <Route element={<ProtectedRoutes needAuthorized={true} />}>
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/profile/orders/:id" element={<OrderPage type="profile" />} />
          {background && <Route path="/profile/orders/:id" element={<></>} />}
        </Route>

        {/* Защита авторизованного */}
        <Route element={<ProtectedRoutes needAuthorized={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </>
  )
}
