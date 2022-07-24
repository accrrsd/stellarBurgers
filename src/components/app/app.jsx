// import style from './app.module.css'
import { Route, Routes } from 'react-router-dom'

import Constructor from '../../pages/Constructor'
import Profile from '../../pages/Profile'
import AppHeader from '../app-header/app-header'
import Login from '../../pages/login'
import Register from '../../pages/register'
import ForgotPassword from '../../pages/forgot-password'
import ResetPassword from '../../pages/reset-password'
import { ProtectedRoute } from '../protected-route/protected-route'
export default function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Constructor />} />
        <Route path="/orders/*" element={<></>} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute protectAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute protectAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  )
}
