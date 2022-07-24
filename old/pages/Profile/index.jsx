import style from './Profile.module.css'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormElement } from '../../components/form-element/form-element'
import Links from './links'

export default function Profile() {
  const [disabledInputs, setDisabledInputs] = useState({
    name: true,
    email: true,
    password: true,
  })

  const nameRef = useRef(null)
  const formRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  // Значение в инпуте
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  })

  const formHook = useForm({ mode: 'onBlur' })

  const {
    formState: { errors },
    trigger,
    setValue,
  } = formHook

  // Запись значений из инпута
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
    setValue(e.target.name, e.target.value)
  }

  // Проверка при расфокусировке
  const handleOnBlur = async (e) => {
    const name = await e.target.name
    await trigger(name)
    const errMessage = errors && errors[name] && errors[name].message
    setDisabledInputs({ ...disabledInputs, [name]: !errMessage })
  }

  // Нажатие на иконку
  const handleIconClick = (ref) => {
    setDisabledInputs({ ...disabledInputs, [ref.current.name]: false })
    ref.current.disabled = false
    ref.current.focus()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.linksWrapper}>
        <Links />
        <p className={style.linksSubline}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={style.form} onSubmit={onSubmit} ref={formRef}>
        <FormElement
          ref={nameRef}
          formHook={formHook}
          name="name"
          rules={{
            required: 'Обязательное поле',
          }}
          type="text"
          placeholder="Имя"
          value={formState.name}
          onChange={handleChange}
          icon={disabledInputs.name && 'EditIcon'}
          onIconClick={() => handleIconClick(nameRef)}
          onBlur={handleOnBlur}
          disabled={disabledInputs.name}
        />

        <FormElement
          ref={emailRef}
          formHook={formHook}
          name="email"
          rules={{
            required: 'Обязательное поле',
            pattern: {
              value: /@/,
              message: 'Некорректно введена электронная почта',
            },
          }}
          type="email"
          placeholder="E-mail"
          value={formState.email}
          onChange={handleChange}
          icon={disabledInputs.email && 'EditIcon'}
          onIconClick={() => handleIconClick(emailRef)}
          onBlur={handleOnBlur}
          disabled={disabledInputs.email}
        />

        <FormElement
          ref={passwordRef}
          formHook={formHook}
          name="password"
          rules={{
            required: 'Обязательное поле',
          }}
          type={`${disabledInputs.password ? 'password' : 'text'}`}
          placeholder="Пароль"
          value={formState.password}
          onChange={handleChange}
          icon={disabledInputs.password && 'EditIcon'}
          onIconClick={() => handleIconClick(passwordRef)}
          onBlur={handleOnBlur}
          disabled={disabledInputs.password}
        />
      </form>
    </div>
  )
}
