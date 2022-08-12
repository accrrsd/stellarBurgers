import style from './reset-password.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { FormElement } from '../../components/form-element/form-element'
import { simpleRequired } from '../../utils/variables'
import { resetPass } from '../../services/slices/profile'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { refreshToken } from '../../services/slices/profile'

export default function ResetPassword() {
  const localeToken = useSelector((store) => store.profileReducer.refreshToken)

  const [formState, setFormState] = useState({
    password: '',
    code: '',
  })

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const prevPage = !!location.state?.fromForgot

  useEffect(() => {
    !prevPage && navigate(-1)
  }, [prevPage, navigate])

  const formHook = useForm({ mode: 'onBlur' })

  const { setValue, handleSubmit } = formHook

  const submit = (data) => {
    const res = {}
    res.password = data.password
    res.token = data.code
    dispatch(resetPass(res)).then(
      (data) =>
        data.meta.requestStatus === 'rejected' &&
        localeToken &&
        dispatch(refreshToken({ token: localeToken })).then(() => {
          dispatch(resetPass(res))
        })
    )
    navigate('/', { state: { fromForgot: false } })
  }

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
    setValue(e.target.name, e.target.value)
  }

  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Восстановление пароля</h3>
      <form className={style.form} onSubmit={handleSubmit(submit)}>
        <FormElement
          formHook={formHook}
          name="password"
          type="password"
          rules={simpleRequired}
          placeholder="Введите новый пароль"
          value={formState.password}
          onChange={handleChange}
        />
        <FormElement
          formHook={formHook}
          name="code"
          type="text"
          rules={simpleRequired}
          placeholder="Введите код из письма"
          value={formState.code}
          onChange={handleChange}
        />
        <Button>Сохранить</Button>
      </form>
      <p className={style.suggest}>
        Вспомнили пароль?
        <Link to={'/login'} className={style.accentLink}>
          Войти
        </Link>
      </p>
    </div>
  )
}
