import style from './register.module.css'
import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { FormElement } from '../../components/form-element/form-element'
import { emailRules, simpleRequired } from '../../utils/variables'
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from '../../hooks/appHooks'
import { register } from '../../services/slices/profile'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { refreshToken } from '../../services/slices/profile'

import { TUser } from '../../services/slices/profile'

export default function Register() {
  const dispatch = useDispatch()
  const localeToken = useSelector((store) => store.profileReducer.refreshToken)

  const initialData = {
    name: '',
    email: '',
    password: '',
  }

  const [formState, setFormState] = useState(initialData)

  const formHook = useForm({ mode: 'onBlur', defaultValues: initialData })
  const { setValue, handleSubmit } = formHook

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
    setValue(e.target.name as keyof TUser, e.target.value)
  }

  const submit = (data: TUser) => {
    dispatch(register(data)).then((data2) => {
      data2.meta.requestStatus === 'rejected' &&
        localeToken &&
        dispatch(refreshToken({ token: localeToken })).then(() => {
          dispatch(register(data))
        })
    })
  }

  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Регистрация</h3>
      <form className={style.form} noValidate onSubmit={handleSubmit(submit)}>
        <FormElement
          formHook={formHook}
          name="name"
          type="text"
          rules={simpleRequired}
          placeholder="Имя"
          value={formState.name}
          onChange={handleChange}
        />
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
          rules={simpleRequired}
          type="password"
          placeholder="Пароль"
          value={formState.password}
          onChange={handleChange}
        />
        <Button>Зарегистрироваться</Button>
      </form>
      <p className={style.suggest}>
        Уже зарегистрированы?
        <Link to={'/login'} replace className={style.accentLink}>
          Войти
        </Link>
      </p>
    </div>
  )
}
