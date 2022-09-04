import { configureStore } from '@reduxjs/toolkit'

import { ingredientsReducer } from '../services/slices/ingredients'
import { constructorReducer } from '../services/slices/constructorList'
import { ingredientDetailsReducer } from '../services/slices/ingredientDetails'
import { orderDetailsReducer } from '../services/slices/orderDetails'
import { profileReducer } from '../services/slices/profile'
import { ordersSliceReducer } from '../services/slices/orders'

export const store = configureStore({
  reducer: {
    ingredientsReducer,
    constructorReducer,
    ingredientDetailsReducer,
    orderDetailsReducer,
    profileReducer,
    ordersSliceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
