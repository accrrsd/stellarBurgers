// import style from './app.module.css'
import { Route, Routes } from 'react-router-dom'

import Constructor from '../../pages/Constructor'
import Profile from '../../pages/Profile'
import AppHeader from '../app-header/app-header'
import Login from '../../pages/login'
import Register from '../../pages/register'
import ForgotPassword from '../../pages/forgot-password'
import ResetPassword from '../../pages/reset-password'
// import { ProtectedRoute } from '../protected-route/protected-route'
import { ProtectedRoutes } from '../protected-routes/protected-routes'
import { useEffect } from 'react'
import { checkAuth } from '../../services/slices/profile'
import { useDispatch } from 'react-redux'
import IngredientPage from '../../pages/Ingredient/index'
import { getIngredients } from '../../services/slices/ingredients'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Constructor />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/orders/*" element={<></>} />

        {/* Защита от не авторизованного */}
        <Route element={<ProtectedRoutes needAuthorized={true} />}>
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/profile/orders" element={<></>} />
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
