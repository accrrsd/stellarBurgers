import style from './forgot-password.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAppDispatch as useDispatch } from '../../hooks/appHooks'

import { emailRules } from '../../utils/variables'
import { FormElement } from '../../components/form-element/form-element'
import { forgotPass } from '../../services/slices/profile'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

export default function ForgotPassword() {
  const [emailValue, setEmailValue] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formHook = useForm({ mode: 'onBlur', defaultValues: { email: '' } })

  const { setValue, handleSubmit } = formHook

  const submit = (data: { email: string }) => {
    dispatch(forgotPass(data))
    navigate('/reset-password', { state: { fromForgot: true } })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
    setValue(e.target.name as 'email', e.target.value)
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
