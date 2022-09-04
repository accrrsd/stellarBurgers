import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TIngredient } from '../../utils/types'

type TInitialState = {
  items: TIngredient[]
  value: number
  sideBun: TIngredient | null
  draggingIndex: number | boolean
}

const initialState: TInitialState = {
  items: [],
  value: 0,
  sideBun: null,
  draggingIndex: false,
}

const constructorListSlice = createSlice({
  name: 'constructorList',
  initialState,
  reducers: {
    initItems(state, action: PayloadAction<TIngredient[]>) {
      state.items = action.payload
    },
    changeSideBun(state, action: PayloadAction<TIngredient | null>) {
      state.sideBun = action.payload
    },
    addItem(state, action: PayloadAction<TIngredient>) {
      state.items.push(action.payload)
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item, itemIndex) => itemIndex !== action.payload)
    },
    changeValue(state, action: PayloadAction<number>) {
      state.value = action.payload
    },
    moveItem(state, action: PayloadAction<{ elemIndex: number; dragOver: number }>) {
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
