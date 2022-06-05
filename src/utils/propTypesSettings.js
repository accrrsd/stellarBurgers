import propValidate from 'prop-types'

export const ingredientForBurgerIngredients = {
  item: propValidate.shape({
    _id: propValidate.string.isRequired,
    name: propValidate.string.isRequired,
    type: propValidate.string.isRequired,
    proteins: propValidate.number,
    fat: propValidate.number,
    carbohydrates: propValidate.number,
    calories: propValidate.number,
    price: propValidate.number.isRequired,
    image: propValidate.string.isRequired,
    image_mobile: propValidate.string,
    image_large: propValidate.string,
    __v: propValidate.any,
  }).isRequired,
}

export const ingredientForDetailsModal = {
  item: propValidate.shape({
    _id: propValidate.string,
    name: propValidate.string.isRequired,
    type: propValidate.string,
    proteins: propValidate.number.isRequired,
    fat: propValidate.number.isRequired,
    carbohydrates: propValidate.number.isRequired,
    calories: propValidate.number.isRequired,
    price: propValidate.number,
    image: propValidate.string.isRequired,
    image_mobile: propValidate.string,
    image_large: propValidate.string,
    __v: propValidate.any,
  }).isRequired,
}
