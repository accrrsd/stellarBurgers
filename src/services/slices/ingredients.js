import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getFromApi } from '../../utils/api'

export const getIngredients = createAsyncThunk(
  'ingredientsSlice/getIngredients',
  async function (_, { rejectWithValue }) {
    try {
      return getFromApi('ingredients')
    } catch (error) {
      rejectWithValue(error.massage)
    }
  }
)
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: false,
    status: null,
  },
  reducers: {},
  extraReducers: {
    [getIngredients.pending]: (state) => {
      state.ingredients = false
      state.status = 'loading'
    },
    [getIngredients.fulfilled]: (state, action) => {
      state.ingredients = action.payload
      state.status = 'done'
    },
    [getIngredients.rejected]: (state, action) => {
      state.ingredients = false
      state.status = 'error'
      state.error = action.payload
    },
  },
})
export const ingredientsReducer = ingredientsSlice.reducer
