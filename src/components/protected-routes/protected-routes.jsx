import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
export const ProtectedAuthorized = () => {
  const auth = useSelector((store) => store.profileReducer.loginState)
  return auth ? <Navigate to={-1} /> : <Outlet />
}

export const ProtectedUnauthorized = () => {
  const auth = useSelector((store) => store.profileReducer.loginState)
  return auth ? <Outlet /> : <Navigate to="/login" />
}
