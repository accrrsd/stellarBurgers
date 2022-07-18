import { useRef, useState } from 'react'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import style from './register.module.css'

export const Register = () => {
  const formRef = useRef(null)
  const onSubmit = () => console.log('submitted')
  const [hiddenPass, setHiddenPass] = useState(true)

  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Регистрация</h3>
      <form className={style.form} onSubmit={onSubmit} ref={formRef}>
        <div className={style.inputWrapper}>
          <Input placeholder="Имя" type="text" name="name" />
        </div>
        <div className={style.inputWrapper}>
          <Input placeholder="E-mail" type="email" name="email" />
        </div>
        <div className={style.inputWrapper}>
          <Input
            placeholder="Пароль"
            type={`${hiddenPass ? 'password' : 'text'}`}
            name="password"
            icon={hiddenPass ? 'ShowIcon' : 'HideIcon'}
            onIconClick={() => setHiddenPass(!hiddenPass)}
          />
        </div>

        <div className={style.buttonWrapper}>
          <Button type="primary" size="large" onClick={() => formRef.submit()}>
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <p className={style.suggest}>
        Уже зарегистрированы?
        <Link to={'/profile/'} replace className={style.accentLink}>
          Войти
        </Link>
      </p>
    </div>
  )
}
