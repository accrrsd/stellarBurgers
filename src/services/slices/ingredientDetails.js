import { createSlice } from '@reduxjs/toolkit'

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState: {
    ingredient: false,
  },
  reducers: {
    openIngredientInfo(state, action) {
      state.ingredient = {
        name: action.payload.name,
        image: action.payload.image,

        calories: action.payload.calories,
        proteins: action.payload.proteins,
        fat: action.payload.fat,
        carbohydrates: action.payload.carbohydrates,
      }
    },
    closeIngredientInfo(state, action) {
      state.ingredient = false
      sessionStorage.removeItem('openedIngredient')
    },
  },
})
export const { openIngredientInfo, closeIngredientInfo } = ingredientDetailsSlice.actions
export const ingredientDetailsReducer = ingredientDetailsSlice.reducer
