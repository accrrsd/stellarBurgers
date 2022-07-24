import style from './login.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { FormElement } from '../../../components/form-element/form-element'
import { SubmitButton } from '../../../components/submit-button/submit-button'
import { emailRules, simpleRequired } from '../../../utils/variables'

export const Login = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const formHook = useForm({ mode: 'onBlur' })

  const { setValue, handleSubmit } = formHook

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
    setValue(e.target.name, e.target.value)
  }

  const submit = (data) => {
    alert(JSON.stringify(data))
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
        <SubmitButton>Войти</SubmitButton>
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
