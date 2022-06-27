import { createSlice } from '@reduxjs/toolkit'

const constructorListSlice = createSlice({
  name: 'constructorList',
  initialState: {
    items: [],
    value: 0,
  },
  reducers: {
    initItems(state, action) {
      state.items = action.payload
    },
    addItem(state, action) {
      state.items.push(action.payload)
    },
    removeItem(state, action) {
      state.items = state.items.filter((item, itemIndex) => itemIndex !== action.payload)
    },
    changeValue(state, action) {
      state.value = action.payload
    },
    moveItem(state, action) {},
  },
})

export const { initItems, addItem, removeItem, changeValue, moveItem } =
  constructorListSlice.actions
export const constructorReducer = constructorListSlice.reducer
