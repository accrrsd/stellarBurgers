import style from './Profile.module.css'
import Links from './links'
import { Route, Routes, useLocation } from 'react-router-dom'
import Form from './form'
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../../hooks/appHooks'
import { checkAuth, getUserProfile, refreshToken } from '../../services/slices/profile'
import { getCookie } from '../../utils/cookie'
import { useEffect } from 'react'
import { UserOrders } from './user-orders/user-orders'
import { TLocation } from '../../utils/types'

export default function Profile() {
  const dispatch = useDispatch()
  const location = useLocation() as TLocation
  const background = location.state?.background
  const localeToken = useSelector((store) => store.profileReducer.refreshToken)

  // Обновление данных
  useEffect(() => {
    const cookie = !!getCookie('access')
    cookie &&
      dispatch(getUserProfile()).then((data) => {
        data.meta.requestStatus === 'rejected' &&
          localeToken &&
          dispatch(refreshToken({ token: localeToken })).then(() => {
            dispatch(getUserProfile()).then(() => dispatch(checkAuth()))
          })
      })
  }, [dispatch, localeToken])

  return (
    <div className={style.wrapper}>
      <div className={style.connect}>
        <Links />
        <Routes location={background ?? location}>
          <Route path="/" element={<Form />} />
          <Route path="/orders" element={<UserOrders />} />
        </Routes>
      </div>
    </div>
  )
}
