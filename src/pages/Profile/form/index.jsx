import style from './form.module.css'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { FormElement } from '../../../components/form-element/form-element'
import { emailRules, simpleRequired } from '../../../utils/variables'
import { useDispatch, useSelector } from 'react-redux'
import { patchUserProfile, refreshToken } from '../../../services/slices/profile'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'

export default function Form() {
  const dispatch = useDispatch()
  const initialData = useSelector((store) => store.profileReducer.user)
  const localeToken = useSelector((store) => store.profileReducer.refreshToken)

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
  const [formState, setFormState] = useState(initialData)

  const formHook = useForm({ mode: 'onBlur', defaultValues: initialData })

  const {
    formState: { errors },
    trigger,
    setValue,
    handleSubmit,
  } = formHook

  // Начальные значения после получения данных о пользователе
  useEffect(() => {
    setFormState({
      ...formState,
      name: initialData.name,
      email: initialData.email,
      password: initialData.password,
    })

    formHook.setValue('name', initialData.name)
    formHook.setValue('email', initialData.email)
    formHook.setValue('password', initialData.password)
    // eslint-disable-next-line
  }, [initialData])

  const [buttonsVisible, setButtonVisible] = useState(false)

  useEffect(() => {
    setButtonVisible(
      formState.name !== initialData.name ||
        formState.email !== initialData.email ||
        formState.password !== initialData.password
    )
  }, [formState, initialData])

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

  const cancelForm = (e) => {
    setButtonVisible(false)
    formHook.reset(initialData, { keepDefaultValues: true })
    setFormState(initialData)
    formHook.clearErrors()
  }

  const submit = (data) => {
    dispatch(patchUserProfile(data)).then(
      (data2) =>
        data2.meta.requestStatus === 'rejected' &&
        localeToken &&
        dispatch(refreshToken({ token: localeToken })).then(() => {
          dispatch(patchUserProfile(data))
        })
    )
  }

  return (
    <div className={style.wrapper}>
      <form className={style.form} onSubmit={handleSubmit(submit)} ref={formRef}>
        <FormElement
          ref={nameRef}
          formHook={formHook}
          name="name"
          type="text"
          rules={simpleRequired}
          placeholder="Имя"
          value={formState.name}
          onChange={handleChange}
          icon={disabledInputs.name ? 'EditIcon' : 'CloseIcon'}
          onIconClick={() => handleIconClick(nameRef)}
          onBlur={handleOnBlur}
          disabled={disabledInputs.name}
        />

        <FormElement
          ref={emailRef}
          formHook={formHook}
          name="email"
          type="email"
          rules={emailRules}
          placeholder="Логин"
          value={formState.email}
          onChange={handleChange}
          icon={disabledInputs.email ? 'EditIcon' : 'CloseIcon'}
          onIconClick={() => handleIconClick(emailRef)}
          onBlur={handleOnBlur}
          disabled={disabledInputs.email}
        />
        <FormElement
          ref={passwordRef}
          formHook={formHook}
          name="password"
          noPreset
          type={disabledInputs.password ? 'password' : 'text'}
          rules={{
            required: buttonsVisible ? 'Обязательное поле' : false,
          }}
          placeholder="Пароль"
          value={formState.password}
          onChange={handleChange}
          icon={disabledInputs.password ? 'EditIcon' : 'CloseIcon'}
          onIconClick={() => handleIconClick(passwordRef)}
          onBlur={handleOnBlur}
          disabled={disabledInputs.password}
        />
        <div
          className={`${style.buttonsWrapper} ${
            buttonsVisible ? style.buttonsVisible : style.buttonsHide
          }`}
        >
          <Button type="secondary" onClick={cancelForm}>
            Отмена
          </Button>
          <Button type="primary">Сохранить</Button>
        </div>
      </form>
    </div>
  )
}
