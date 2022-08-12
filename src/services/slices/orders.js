import { createSlice } from '@reduxjs/toolkit'

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    allOrders: false,
    userOrders: false,
    openedOrder: false,
  },
  reducers: {
    setAllOrders(state, action) {
      state.allOrders = action.payload
    },
    setUserOrders(state, action) {
      state.userOrders = action.payload
    },
    openOrder(state, action) {
      state.openedOrder = action.payload
    },

    closeOrder(state) {
      state.openedOrder = false
      sessionStorage.removeItem('openedOrder')
    },
  },
})

export const { setAllOrders, setUserOrders, closeOrder, openOrder } = ordersSlice.actions
export const ordersSliceReducer = ordersSlice.reducer
