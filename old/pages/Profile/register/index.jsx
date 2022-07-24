import style from './register.module.css'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { FormElement } from '../../../components/form-element/form-element'
import { emailRules, simpleRequired } from '../../../utils/variables'
import { SubmitButton } from '../../../components/submit-button/submit-button'

export const Register = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  })

  const formRef = useRef(null)
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
      <h3 className={style.title}>Регистрация</h3>
      <form className={style.form} onSubmit={onSubmit} ref={formRef}>
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
          type={'password'}
          placeholder="Пароль"
          value={formState.password}
          onChange={handleChange}
        />
        <SubmitButton>Зарегистрироваться</SubmitButton>
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
