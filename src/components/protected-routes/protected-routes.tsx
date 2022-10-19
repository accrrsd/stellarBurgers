import { useAppSelector as useSelector } from '../../hooks/appHooks'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

export const ProtectedRoutes = ({ needAuthorized = false }) => {
  const auth = useSelector((store) => store.profileReducer.loginState)
  const location = useLocation()
  if (auth && !needAuthorized) {
    // Если пользователь авторизован, а не должен, возвращаем на предыдущую страницу
    //@ts-ignore:next-line
    return <Navigate to={-1} />
  } else if (!auth && needAuthorized) {
    // Если пользователь не авторизован, а должен, переадресуем на логин с передачей локации
    return <Navigate to="/login" state={{ from: location }} />
  } else {
    // Если все хорошо, возвращаем результат роутинга
    return <Outlet />
  }
}
