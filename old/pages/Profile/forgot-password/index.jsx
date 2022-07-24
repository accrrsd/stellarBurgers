import style from './forgot-password.module.css'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { emailRules } from '../../../utils/variables'
import { FormElement } from '../../../components/form-element/form-element'
import { SubmitButton } from '../../../components/submit-button/submit-button'

export const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState('')

  const formHook = useForm({ mode: 'onBlur' })

  const { setValue } = formHook

  const handleChange = (e) => {
    setEmailValue(e.target.value)
    setValue(e.target.name, e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
  }
  const formRef = useRef(null)

  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Восстановление пароля</h3>
      <form className={style.form} onSubmit={onSubmit} ref={formRef}>
        <FormElement
          formHook={formHook}
          name="email"
          type="email"
          rules={emailRules}
          placeholder="E-mail"
          value={emailValue}
          onChange={handleChange}
        />
        <SubmitButton>Восстановить</SubmitButton>
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
