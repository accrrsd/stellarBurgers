import style from './reset-password.module.css'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormElement } from '../../../components/form-element/form-element'
import { emailRules, simpleRequired } from '../../../utils/variables'
import { SubmitButton } from '../../../components/submit-button/submit-button'

export const ResetPassword = () => {
  const formRef = useRef(null)
  const [formState, setFormState] = useState({
    newPassword: '',
    emailCode: '',
  })

  const formHook = useForm({ mode: 'onBlur' })

  const { setValue } = formHook

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
    setValue(e.target.name, e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
  }

  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Восстановление пароля</h3>
      <form className={style.form} onSubmit={onSubmit} ref={formRef}>
        <FormElement
          formHook={formHook}
          name="newPassword"
          type="password"
          rules={simpleRequired}
          placeholder="Введите новый пароль"
          value={formState.newPassword}
          onChange={handleChange}
        />
        <FormElement
          formHook={formHook}
          name="emailCode"
          type="text"
          rules={emailRules}
          placeholder="Введите код из письма"
          value={formState.emailCode}
          onChange={handleChange}
        />
        <SubmitButton>Сохранить</SubmitButton>
      </form>
      <p className={style.suggest}>
        Вспомнили пароль?
        <Link to={'/profile/login'} className={style.accentLink}>
          Войти
        </Link>
      </p>
    </div>
  )
}
