export type TIngredient = {
  _id: string
  name: string
  type: string

  calories: number
  proteins: number
  fat: number
  carbohydrates: number

  price: number
  image: string
  image_mobile: string
  image_large: string

  __v?: number
  uuid?: string
  count?: number
}

export type TOwner = {
  createdAt: string
  email: string
  name: string
  updatedAt: string
}

export type TOrder = {
  owner?: TOwner
  createdAt?: string
  ingredients: TIngredient[]
  name: string
  number: number
  price: number
  status: string
  updatedAt: string
  _id: string
}

export type TMutableOrder = {
  createdAt?: string
  ingredients: string[]
  name: string
  number: number
  owner?: TOwner
  price: number
  status: string
  updatedAt: string
  _id: string
}

export type TLocation = {
  pathname: string
  state: {
    background?: string
    from?: {
      pathname?: string
    }
    fromForgot?: boolean
  }
}

export type TInputNames = 'name' | 'email' | 'password'

export type TUiIcons =
  | 'CurrencyIcon'
  | 'BurgerIcon'
  | 'LockIcon'
  | 'DragIcon'
  | 'CloseIcon'
  | 'CheckMarkIcon'
  | 'ListIcon'
  | 'ProfileIcon'
  | 'EditIcon'
  | 'InfoIcon'
  | 'ShowIcon'
  | 'HideIcon'
  | 'LogoutIcon'
  | 'DeleteIcon'
  | 'ArrowUpIcon'
  | 'ArrowDownIcon'
  | 'MenuIcon'
