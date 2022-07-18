import style from './forgot-password.module.css'
import { useRef } from 'react'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'

export const ForgotPassword = () => {
  const onSubmit = () => console.log('submitted')
  const formRef = useRef(null)
  return (
    <div className={style.wrapper}>
      <h3 className={style.title}>Восстановление пароля</h3>
      <form className={style.form} onSubmit={onSubmit} ref={formRef}>
        <div className={style.inputWrapper}>
          <Input placeholder="E-mail" type="email" name="email" />
        </div>
        <div className={style.buttonWrapper}>
          <Button type="primary" size="large" onClick={() => formRef.submit()}>
            Восстановить
          </Button>
        </div>
      </form>
      <p className={style.suggest}>
        Вспомнили пароль?
        <Link to={'/profile/'} className={style.accentLink}>
          Войти
        </Link>
      </p>
    </div>
  )
}
