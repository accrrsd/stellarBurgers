import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  profileManager,
  getUser,
  patchUser,
  resetPassword,
  refreshToken as refreshTokenApi,
} from '../../utils/api'
import { setCookie, getCookie, eraseCookie } from '../../utils/cookie'
import type {
  TProfileLoginBody,
  TProfileForgotBody,
  TProfileRegisterBody,
  TProfileLogoutBody,
  TRefreshBody,
  TPatchUserBody,
  TResetBody,
} from '../../utils/api'

type TRefreshToken = {
  success: boolean
  accessToken?: string
  refreshToken?: string
}

type TGetUser = {
  success: boolean
  user?: TUser
}

type TMessageThunk = { success: boolean; message?: string }

// =========================================
export const getUserProfile = createAsyncThunk<TGetUser, undefined, { rejectValue: string }>(
  'profileSlice/getUserProfile',
  async function (_, { rejectWithValue }) {
    try {
      return getUser()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const refreshToken = createAsyncThunk<TRefreshToken, TRefreshBody, { rejectValue: string }>(
  'profileSlice/refreshToken',
  async function (body, { rejectWithValue }) {
    try {
      return refreshTokenApi(body)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

// ===========================================
type TProfileThunk = {
  success: boolean
  user?: TUser
  accessToken?: string
  refreshToken?: string
}

export const login = createAsyncThunk<TProfileThunk, TProfileLoginBody, { rejectValue: string }>(
  'profileSlice/getProfile',
  async function (body, { rejectWithValue }) {
    try {
      return profileManager(body, 'login')
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const register = createAsyncThunk<
  TProfileThunk,
  TProfileRegisterBody,
  { rejectValue: string }
>('profileSlice/register', async function (body, { rejectWithValue }) {
  try {
    return profileManager(body, 'register')
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const logout = createAsyncThunk<TMessageThunk, TProfileLogoutBody, { rejectValue: string }>(
  'profileSlice/logout',
  async function (body, { rejectWithValue }) {
    try {
      return profileManager(body, 'logout')
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const patchUserProfile = createAsyncThunk<TGetUser, TPatchUserBody, { rejectValue: string }>(
  'profileSlice/patchUserProfile',
  async function (body, { rejectWithValue }) {
    try {
      return patchUser(body)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

// =============================================
export const forgotPass = createAsyncThunk<
  TMessageThunk,
  TProfileForgotBody,
  { rejectValue: string }
>('profileSlice/forgotPass', async function (body, { rejectWithValue }) {
  try {
    return profileManager(body, 'forgotPass')
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const resetPass = createAsyncThunk<TMessageThunk, TResetBody, { rejectValue: string }>(
  'profileSlice/resetPass',
  async function (body, { rejectWithValue }) {
    try {
      return resetPassword(body)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const rewriteAllState = (state: TInitialState, action: PayloadAction<TProfileThunk>) => {
  const received = action.payload
  state.status = received.success
  state.user.name = received.user!.name
  state.user.email = received.user!.email
  state.accessToken = received.accessToken!
  state.refreshToken = received.refreshToken!
  state.loginState = true

  window.localStorage.setItem('refreshToken', received.refreshToken!)
  // Куки
  setCookie('access', received.accessToken!.split('Bearer ')[1])
}

export type TUser = {
  name: string
  email: string
  password: string
}

type TInitialState = {
  status: boolean | null
  user: TUser
  accessToken: string
  refreshToken: string
  loginState: boolean
}

const initialState: TInitialState = {
  status: false,
  user: {
    name: '',
    email: '',
    password: '',
  },
  accessToken: '',
  refreshToken: window.localStorage.getItem('refreshToken') || '',
  loginState: false,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    checkAuth(state) {
      const cookie = !!getCookie('access')
      state.loginState = cookie
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, rewriteAllState)
      .addCase(login.rejected, (state) => {
        state.status = null
      })

      .addCase(register.fulfilled, rewriteAllState)
      .addCase(register.rejected, (state) => {
        state.status = null
      })

      .addCase(refreshToken.fulfilled, (state, action) => {
        setCookie('access', action.payload.accessToken!.split('Bearer ')[1])
        state.accessToken = action.payload.accessToken!
        state.refreshToken = action.payload.refreshToken!
      })
      .addCase(refreshToken.rejected, (state) => {
        eraseCookie('access')
        state.loginState = false
        localStorage.removeItem('refreshToken')
      })

      .addCase(logout.fulfilled, (state) => {
        eraseCookie('access')
        state.loginState = false
      })

      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user.name = action.payload.user!.name
        state.user.email = action.payload.user!.email
      })
      .addCase(getUserProfile.rejected, (state) => {
        eraseCookie('access')
        state.loginState = false
      })
  },
})

export const { checkAuth } = profileSlice.actions
export const profileReducer = profileSlice.reducer
