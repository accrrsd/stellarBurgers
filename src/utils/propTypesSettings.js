import propValidate from 'prop-types'

export const ingredientType = {
  item: propValidate.shape({
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
  }).isRequired,
}
