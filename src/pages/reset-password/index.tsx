import style from './reset-password.module.css'
import { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../../hooks/appHooks'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { FormElement } from '../../components/form-element/form-element'
import { simpleRequired } from '../../utils/variables'
import { resetPass } from '../../services/slices/profile'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { refreshToken } from '../../services/slices/profile'
import { TLocation } from '../../utils/types'

export default function ResetPassword() {
  const localeToken = useSelector((store) => store.profileReducer.refreshToken)

  const initialData = {
    password: '',
    code: '',
  }

  const [formState, setFormState] = useState(initialData)

  const dispatch = useDispatch()
  const location = useLocation() as TLocation
  const navigate = useNavigate()

  const prevPage = !!location.state?.fromForgot

  useEffect(() => {
    !prevPage && navigate(-1)
  }, [prevPage, navigate])

  const formHook = useForm({ mode: 'onBlur', defaultValues: initialData })

  const { setValue, handleSubmit } = formHook

  const submit = (data: { password: string; code: string }) => {
    const res = {} as { password: string; token: string }
    res.password = data.password
    res.token = data.code
    dispatch(resetPass(res)).then((data) => {
      data.meta.requestStatus === 'rejected' &&
        localeToken &&
        dispatch(refreshToken({ token: localeToken })).then(() => {
          dispatch(resetPass(res))
        })
    })
    navigate('/', { state: { fromForgot: false } })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
    setValue(e.target.name as 'password' | 'code', e.target.value)
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
