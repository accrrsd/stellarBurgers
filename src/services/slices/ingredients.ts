import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getFromApi } from '../../utils/api'
import { TIngredient } from '../../utils/types'

export const getIngredients = createAsyncThunk<TIngredient[], undefined, { rejectValue: string }>(
  'ingredientsSlice/getIngredients',
  async function (_, { rejectWithValue }) {
    try {
      return getFromApi('ingredients')
    } catch (error: any) {
      rejectWithValue(error.message)
    }
  }
)

type TIngredientsState = {
  ingredients: TIngredient[] | null
  status: string | null
}

const initialState: TIngredientsState = {
  ingredients: null,
  status: null,
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.ingredients = null
        state.status = 'loading'
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload
        state.status = 'done'
      })
      .addCase(getIngredients.rejected, (state) => {
        state.ingredients = null
        state.status = 'error'
      })
  },
})
export const ingredientsReducer = ingredientsSlice.reducer
