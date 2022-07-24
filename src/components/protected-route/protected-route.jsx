import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'
import { checkAuth } from '../../services/slices/profile'
export const ProtectedRoute = ({ children, protectAuth }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  dispatch(checkAuth())
  const auth = useSelector((store) => store.profileReducer.loginState)

  const navigateLogic = () => {
    return !protectAuth && !auth ? (
      <Navigate to="/login" state={{ from: location }} />
    ) : protectAuth && auth ? (
      <Navigate to={-1} state={{ from: location }} />
    ) : (
      children
    )
  }

  return navigateLogic()
}
