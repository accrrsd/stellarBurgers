// import style from './app.module.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { ProtectedRoutes } from '../protected-routes/protected-routes'
import { checkAuth } from '../../services/slices/profile'
import { getIngredients } from '../../services/slices/ingredients'
import { getCookie } from '../../utils/cookie'
import { useSocket } from '../../hooks/useSocket'
import { setAllOrders, setUserOrders } from '../../services/slices/orders'

import Constructor from '../../pages/Constructor'
import Profile from '../../pages/Profile'
import Feed from '../../pages/Feed'
import AppHeader from '../app-header/app-header'
import Login from '../../pages/login'
import Register from '../../pages/register'
import ForgotPassword from '../../pages/forgot-password'
import ResetPassword from '../../pages/reset-password'
import OrderPage from '../../pages/order'
import IngredientPage from '../../pages/Ingredient/index'

export default function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  const onMessageFeed = (e) => dispatch(setAllOrders(JSON.parse(e.data)))

  const onMessageProfile = (e) => dispatch(setUserOrders(JSON.parse(e.data)))

  const feedWs = useSocket('wss://norma.nomoreparties.space/orders/all', {
    onMessage: onMessageFeed,
  })
  const profileWs = useSocket('wss://norma.nomoreparties.space/orders', {
    onMessage: onMessageProfile,
  })

  const background = location.state?.background

  // Проверка на локацию для открытия/закрытия потока
  useEffect(() => {
    if (location.pathname.includes('/feed')) {
      feedWs.connect()
    } else if (location.pathname.includes('/profile')) {
      if (getCookie('access')) {
        profileWs.connect(getCookie('access'))
      }
    } else {
      feedWs.close = () => {}
      profileWs.close = () => {}
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
