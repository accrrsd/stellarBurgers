import { useSelector } from 'react-redux'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import propValidate from 'prop-types'

export const ProtectedRoutes = ({ needAuthorized = false }) => {
  const auth = useSelector((store) => store.profileReducer.loginState)
  const location = useLocation()
  if (auth && !needAuthorized) {
    // Если пользователь авторизован, а не должен, возвращаем на предыдущую страницу
    return <Navigate to={-1} />
  } else if (!auth && needAuthorized) {
    // Если пользователь не авторизован, а должен, переадресуем на логин с передачей локации
    return <Navigate to="/login" state={{ from: location }} />
  } else {
    // Если все хорошо, возвращаем результат роутинга
    return <Outlet />
  }
}

ProtectedRoutes.propTypes = {
  needAuthorized: propValidate.bool,
}
