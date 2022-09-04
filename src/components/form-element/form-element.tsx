import style from './form-element.module.css'
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { forwardRef } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ChangeEvent, MouseEvent, FocusEvent } from 'react'

import { TUiIcons } from '../../utils/types'

type TInputsNames = 'name' | 'email' | 'password' | 'code'
type TInputsTypes = 'text' | 'email' | 'password'

type TFormProps = {
  formHook: UseFormReturn<any, object>
  name: TInputsNames
  type: TInputsTypes
  wrapperStyle?: string
  noPreset?: boolean
  // ...props
  value: string
  icon?: TUiIcons
  rules?: object
  placeholder?: string
  disabled?: boolean
  // functions
  onChange(e: ChangeEvent<HTMLInputElement>): void
  onIconClick?(e: MouseEvent<HTMLDivElement>): void
  onFocus?(e?: FocusEvent<HTMLInputElement>): void
  onBlur?: (e: any) => any
}

export const FormElement = forwardRef<HTMLInputElement, TFormProps>(
  ({ formHook, name, rules, wrapperStyle, type, noPreset, ...props }, ref) => {
    const {
      register,
      formState: { errors },
    } = formHook

    const errMessage = errors && errors[name] && errors[name]!.message

    const {
      onChange: changeRegister,
      name: registerName,
      onBlur: registerBlur,
    } = register(name, rules)

    const currentProps = props
    currentProps.onBlur = currentProps.onBlur ? currentProps.onBlur : registerBlur

    const changeWrapper = (e: ChangeEvent<HTMLInputElement>) => {
      changeRegister(e)
      props.onChange(e)
    }

    let result

    if (!noPreset) {
      switch (type) {
        case 'password':
          result = (
            <div className={`${style.inputWrapper} ${wrapperStyle || ''}`}>
              {/* @ts-ignore:next-line */}
              <PasswordInput {...register(name, rules)} {...currentProps} ref={ref} />
            </div>
          )
          break

        default:
          result = (
            <div className={`${style.inputWrapper} ${wrapperStyle || ''}`}>
              <Input
                error={!!errMessage}
                errorText={`Ошибка: ${errMessage}`}
                type={type}
                {...currentProps}
                name={registerName}
                onChange={changeWrapper}
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
            error={!!errMessage}
            errorText={`Ошибка: ${errMessage}`}
            type={type}
            {...currentProps}
            name={registerName}
            onChange={changeWrapper}
            ref={ref}
          />
        </div>
      )
    }

    return result
  }
)
