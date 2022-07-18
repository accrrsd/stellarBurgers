import './app.module.css'
import Constructor from '../../pages/Constructor'
import Profile from '../../pages/Profile'
import AppHeader from '../app-header/app-header'
import { Route, Routes } from 'react-router-dom'
export default function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Constructor />} />
        <Route path="/orders/*" element={<></>} />
        <Route path="/profile/*" element={<Profile />} />
      </Routes>
    </>
  )
}
