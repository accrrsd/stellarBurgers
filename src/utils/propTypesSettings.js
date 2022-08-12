import propValidate from 'prop-types'

const ingredientShape = {
  _id: propValidate.string,
  name: propValidate.string,
  type: propValidate.string,
  proteins: propValidate.number,
  fat: propValidate.number,
  carbohydrates: propValidate.number,
  calories: propValidate.number,
  price: propValidate.number,
  image: propValidate.string,
  image_mobile: propValidate.string,
  image_large: propValidate.string,
  __v: propValidate.any,
}

export const ingredientType = {
  item: propValidate.shape(ingredientShape).isRequired,
}

export const ingredientTypeNotRequired = {
  item: propValidate.shape(ingredientShape),
}

export const orderShape = {
  ingredients: propValidate.oneOfType([propValidate.array, propValidate.object, propValidate.bool])
    .isRequired,
  status: propValidate.string,
  _id: propValidate.oneOfType([propValidate.number, propValidate.string, propValidate.bool])
    .isRequired,
  number: propValidate.oneOfType([propValidate.number, propValidate.string, propValidate.bool]),
  updatedAt: propValidate.string,
  name: propValidate.string,
}
