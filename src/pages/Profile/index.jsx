import { Login } from './login'
import { Register } from './register'
import { Route, Routes } from 'react-router-dom'
import style from './Profile.module.css'
import { ForgotPassword } from './forgot-password'

export default function Profile() {
  return (
    <div className={style.content}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  )
}
