import style from './login.module.css'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  const onSubmit = () => console.log('submitted')
  const [hiddenPass, setHiddenPass] = useState(true)
  const formRef = useRef(null)
  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Вход</h3>
      <form className={style.form} onSubmit={onSubmit} ref={formRef}>
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
            Войти
          </Button>
        </div>
      </form>
      <div className={style.suggestsWrapper}>
        <p className={style.suggest}>
          Вы — новый пользователь?
          <Link to={'/profile/register'} className={style.accentLink}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={style.suggest}>
          Забыли пароль?
          <Link to={'/profile/forgot-password'} className={style.accentLink}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  )
}
