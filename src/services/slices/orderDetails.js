import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postOrder } from '../../utils/api'

export const getOrderDetails = createAsyncThunk(
  'orderDetailsSlice/getOrder',
  async function (arrayOfId, { rejectWithValue }) {
    try {
      return postOrder(arrayOfId)
    } catch (error) {
      rejectWithValue(error.massage)
    }
  }
)

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {
    name: false,
    number: false,
    success: null,
  },
  reducers: {
    closeOrderDetails(state) {
      state.name = false
      state.number = false
      state.success = null
    },
  },
  extraReducers: {
    [getOrderDetails.pending]: (state) => {
      state.success = 'pending'
    },
    [getOrderDetails.fulfilled]: (state, action) => {
      state.name = action.payload.name
      state.number = action.payload.order.number
      state.success = action.payload.success
    },
    [getOrderDetails.rejected]: (state) => {
      state.name = false
      state.number = false
      state.success = false
    },
  },
})

export const { closeOrderDetails } = orderDetailsSlice.actions
export const orderDetailsReducer = orderDetailsSlice.reducer
