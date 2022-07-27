import style from './register.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { FormElement } from '../../components/form-element/form-element'
import { emailRules, simpleRequired } from '../../utils/variables'
import { useDispatch } from 'react-redux'
import { register } from '../../services/slices/profile'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

export default function Register() {
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  })

  const formHook = useForm({ mode: 'onBlur' })
  const { setValue, handleSubmit } = formHook

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
    setValue(e.target.name, e.target.value)
  }

  const submit = (data) => dispatch(register(data))

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
