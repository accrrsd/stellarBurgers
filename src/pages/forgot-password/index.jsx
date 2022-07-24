import style from './forgot-password.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { emailRules } from '../../utils/variables'
import { FormElement } from '../../components/form-element/form-element'
import { forgotPass } from '../../services/slices/profile'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

export default function ForgotPassword() {
  const [emailValue, setEmailValue] = useState('')

  const dispatch = useDispatch()

  const formHook = useForm({ mode: 'onBlur' })

  const { setValue, handleSubmit } = formHook

  const submit = (data) => dispatch(forgotPass(data))

  const handleChange = (e) => {
    setEmailValue(e.target.value)
    setValue(e.target.name, e.target.value)
  }

  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Восстановление пароля</h3>
      <form className={style.form} onSubmit={handleSubmit(submit)}>
        <FormElement
          formHook={formHook}
          name="email"
          type="email"
          rules={emailRules}
          placeholder="E-mail"
          value={emailValue}
          onChange={handleChange}
        />
        <Button>Восстановить</Button>
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
