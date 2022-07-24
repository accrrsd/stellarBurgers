import style from './form-element.module.css'
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { forwardRef } from 'react'

export const FormElement = forwardRef(
  ({ formHook, name, rules, wrapperStyle, type, noPreset, ...props }, ref) => {
    const {
      register,
      formState: { errors },
    } = formHook

    const errMessage = errors && errors[name] && errors[name].message

    let result

    if (!noPreset) {
      switch (type) {
        case 'password':
          result = (
            <div className={`${style.inputWrapper} ${wrapperStyle || ''}`}>
              <PasswordInput
                {...register(name, rules)}
                error={!!errMessage}
                errorText={`Ошибка: ${errMessage}`}
                {...props}
                ref={ref}
              />
            </div>
          )
          break

        default:
          result = (
            <div className={`${style.inputWrapper} ${wrapperStyle || ''}`}>
              <Input
                {...register(name, rules)}
                error={!!errMessage}
                errorText={`Ошибка: ${errMessage}`}
                type={type}
                {...props}
                ref={ref}
              />
            </div>
          )
          break
      }
    } else {
      result = (
        <div className={`${style.inputWrapper} ${wrapperStyle || ''}`}>
          <Input
            {...register(name, rules)}
            error={!!errMessage}
            errorText={`Ошибка: ${errMessage}`}
            type={type}
            {...props}
            ref={ref}
          />
        </div>
      )
    }

    return result
  }
)
