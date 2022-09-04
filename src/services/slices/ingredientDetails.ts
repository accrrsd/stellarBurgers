import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TCurrentIngredient = {
  name: string
  image: string

  calories: number
  proteins: number
  fat: number
  carbohydrates: number
}

type TIngredientDetails = {
  ingredient: TCurrentIngredient | boolean
}

const initialState: TIngredientDetails = {
  ingredient: false,
}

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    openIngredientInfo(state, action: PayloadAction<TCurrentIngredient>) {
      state.ingredient = {
        name: action.payload.name,
        image: action.payload.image,

        calories: action.payload.calories,
        proteins: action.payload.proteins,
        fat: action.payload.fat,
        carbohydrates: action.payload.carbohydrates,
      }
    },
    closeIngredientInfo(state) {
      state.ingredient = false
      sessionStorage.removeItem('openedIngredient')
    },
  },
})
export const { openIngredientInfo, closeIngredientInfo } = ingredientDetailsSlice.actions
export const ingredientDetailsReducer = ingredientDetailsSlice.reducer
