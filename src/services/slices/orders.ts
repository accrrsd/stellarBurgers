import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TMutableOrder, TOrder } from '../../utils/types'

type TStateMutableOrders = {
  orders?: TMutableOrder[]
  success: boolean
  total?: number
  totalToday?: number
}

type TInitialState = {
  allOrders: TStateMutableOrders | null
  userOrders: TStateMutableOrders | null
  openedOrder: TOrder | null
}

const initialState: TInitialState = {
  allOrders: null,
  userOrders: null,
  openedOrder: null,
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setAllOrders(state, action: PayloadAction<TStateMutableOrders>) {
      state.allOrders = action.payload
    },
    setUserOrders(state, action: PayloadAction<TStateMutableOrders>) {
      state.userOrders = action.payload
    },
    openOrder(state, action: PayloadAction<TOrder>) {
      state.openedOrder = action.payload
    },

    closeOrder(state) {
      state.openedOrder = null
      sessionStorage.removeItem('openedOrder')
    },
  },
})

export const { setAllOrders, setUserOrders, closeOrder, openOrder } = ordersSlice.actions
export const ordersSliceReducer = ordersSlice.reducer
