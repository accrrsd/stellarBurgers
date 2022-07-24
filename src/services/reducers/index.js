import { combineReducers } from 'redux'
import { ingredientsReducer } from '../slices/ingredients'
import { constructorReducer } from '../slices/constructorList'
import { ingredientDetailsReducer } from '../slices/ingredientDetails'
import { orderDetailsReducer } from '../slices/orderDetails'
import { profileReducer } from '../slices/profile'

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  ingredientDetailsReducer,
  orderDetailsReducer,
  profileReducer,
})
