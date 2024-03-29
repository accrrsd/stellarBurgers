import style from './login.module.css'
import { ChangeEvent, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAppDispatch as useDispatch } from '../../hooks/appHooks'

import { FormElement } from '../../components/form-element/form-element'
import { emailRules, simpleRequired } from '../../utils/variables'
import { login } from '../../services/slices/profile'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { TLocation } from '../../utils/types'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation() as TLocation

  const prevPage = location.state?.from?.pathname || '/'
  const returnPage = () => navigate(prevPage, { replace: true })

  const initialData = {
    email: '',
    password: '',
  }

  const [formState, setFormState] = useState(initialData)

  const formHook = useForm({ mode: 'onBlur', defaultValues: initialData })

  const { setValue, handleSubmit } = formHook

  const submit = (data: { email: string; password: string }) => {
    dispatch(login(data)).then(() => {
      returnPage()
    })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
    setValue(e.target.name as 'email' | 'password', e.target.value)
  }

  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Вход</h3>
      <form className={style.form} noValidate onSubmit={handleSubmit(submit)}>
        <FormElement
          formHook={formHook}
          name="email"
          type="email"
          rules={emailRules}
          placeholder="E-mail"
          value={formState.email}
          onChange={handleChange}
        />
        <FormElement
          formHook={formHook}
          name="password"
          type="password"
          rules={simpleRequired}
          placeholder="Пароль"
          value={formState.password}
          onChange={handleChange}
        />
        <Button>Войти</Button>
      </form>
      <div className={style.suggestsWrapper}>
        <p className={style.suggest}>
          Вы — новый пользователь?
          <Link to={'/register'} className={style.accentLink}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={style.suggest}>
          Забыли пароль?
          <Link to={'/forgot-password'} className={style.accentLink}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  )
}
