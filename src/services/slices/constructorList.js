import { createSlice } from '@reduxjs/toolkit'

const constructorListSlice = createSlice({
  name: 'constructorList',
  initialState: {
    items: [],
    value: 0,
    sideBun: {},
    changedItem: false,
    draggingIndex: false,
  },
  reducers: {
    initItems(state, action) {
      state.items = action.payload
    },
    changeSideBun(state, action) {
      state.sideBun = action.payload
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
    moveItem(state, action) {
      const { elemIndex, dragOver } = action.payload
      const arr = state.items
      const temp = arr[dragOver]
      arr[dragOver] = arr[elemIndex]
      arr[elemIndex] = temp
      state.items = arr
      state.draggingIndex = dragOver
    },
    dropMovableItem(state) {
      state.draggingIndex = false
    },
  },
})

export const {
  initItems,
  addItem,
  removeItem,
  changeValue,
  moveItem,
  changeSideBun,
  dropMovableItem,
} = constructorListSlice.actions
export const constructorReducer = constructorListSlice.reducer
