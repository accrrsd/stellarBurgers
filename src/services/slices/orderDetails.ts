import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postOrder } from '../../utils/api'
import { TOrder } from '../../utils/types'

type TOrderPost = {
  name?: string
  order?: TOrder
  success: boolean
}

export const getOrderDetails = createAsyncThunk<TOrderPost, string[], { rejectValue: string }>(
  'orderDetailsSlice/getOrder',
  async function (arrayOfId, { rejectWithValue }) {
    try {
      return postOrder(arrayOfId)
    } catch (error: any) {
      rejectWithValue(error.massage)
    }
  }
)

type TOrderState = {
  name: string | null
  number: number | null
  success: boolean | null | string
}

const initialState: TOrderState = {
  name: null,
  number: null,
  success: null,
}

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    closeOrderDetails(state) {
      state.name = null
      state.number = null
      state.success = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.success = 'pending'
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.name = action.payload.name!
        state.number = action.payload.order!.number
        state.success = action.payload.success
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.name = null
        state.number = null
        state.success = null
      })
  },
})

export const { closeOrderDetails } = orderDetailsSlice.actions
export const orderDetailsReducer = orderDetailsSlice.reducer
