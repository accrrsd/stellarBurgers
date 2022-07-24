export const emailRules = {
  required: 'Обязательное поле',
  pattern: {
    value:
      // eslint-disable-next-line
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    message: 'Некорректно введена электронная почта',
  },
}

export const simpleRequired = {
  required: 'Обязательное поле',
}
