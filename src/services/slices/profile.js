import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  profileManager,
  getUser,
  patchUser,
  refreshToken as refreshTokenApi,
} from '../../utils/api'
import { setCookie, getCookie } from '../../utils/cookie'

export const getUserProfile = createAsyncThunk(
  'profileSlice/getUserProfile',
  async function (_, { rejectWithValue }) {
    try {
      return getUser()
    } catch (error) {
      rejectWithValue(error.massage)
    }
  }
)

export const patchUserProfile = createAsyncThunk(
  'profileSlice/patchUserProfile',
  async function (body, { rejectWithValue }) {
    try {
      return patchUser(body)
    } catch (error) {
      rejectWithValue(error.massage)
    }
  }
)

export const login = createAsyncThunk(
  'profileSlice/getProfile',
  async function (body, { rejectWithValue }) {
    try {
      return profileManager(body, 'login')
    } catch (error) {
      rejectWithValue(error.massage)
    }
  }
)

export const register = createAsyncThunk(
  'profileSlice/register',
  async function (body, { rejectWithValue }) {
    try {
      return profileManager(body, 'register')
    } catch (error) {
      rejectWithValue(error.massage)
    }
  }
)

export const logout = createAsyncThunk(
  'profileSlice/logout',
  async function (body, { rejectWithValue }) {
    try {
      return profileManager(body, 'logout')
    } catch (error) {
      rejectWithValue(error.massage)
    }
  }
)

export const refreshToken = createAsyncThunk(
  'profileSlice/refreshToken',
  async function (body, { rejectWithValue }) {
    try {
      return refreshTokenApi(body)
    } catch (error) {
      rejectWithValue(error.massage)
    }
  }
)

// =============================================
export const forgotPass = createAsyncThunk(
  'profileSlice/forgotPass',
  async function (body, { rejectWithValue }) {
    try {
      return profileManager(body, 'forgotPass')
    } catch (error) {
      rejectWithValue(error.massage)
    }
  }
)
export const resetPass = createAsyncThunk(
  'profileSlice/resetPass',
  async function (body, { rejectWithValue }) {
    try {
      return profileManager(body, 'resetPass')
    } catch (error) {
      rejectWithValue(error.massage)
    }
  }
)

const rewriteAllState = (state, action) => {
  const received = action.payload
  state.status = received.success
  state.user.name = received.user.name
  state.user.email = received.user.email
  state.accessToken = received.accessToken
  state.refreshToken = received.refreshToken
  state.loginState = received.success

  window.localStorage.setItem('refreshToken', received.refreshToken)
  // Куки
  let authToken = received.accessToken.split('Bearer ')[1]
  authToken && setCookie('access', authToken)
}

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    status: false,
    user: {
      name: '',
      email: '',
      password: 'password',
    },
    accessToken: '',
    refreshToken: window.localStorage.getItem('refreshToken') || '',
    passwordUpdate: false,
    loginState: false,
  },
  extraReducers: {
    [login.fulfilled]: rewriteAllState,
    [login.rejected]: (state) => {
      state.status = null
    },

    [register.fulfilled]: rewriteAllState,
    [register.rejected]: (state) => {
      state.status = null
    },

    [forgotPass.fulfilled]: (state, action) => {
      state.passwordUpdate = action.payload.success
    },
    [resetPass.fulfilled]: (state, action) => {
      state.passwordUpdate = action.payload.success
    },

    [refreshToken.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },

    [refreshToken.rejected]: (state, action) => {
      setCookie('access', false)
      state.loginState = false
      localStorage.removeItem('refreshToken')
    },

    [logout.fulfilled]: (state, action) => {
      state.loginState = !action.payload.success
    },

    [getUserProfile.fulfilled]: (state, action) => {
      state.user.name = action.payload.user.name
      state.user.email = action.payload.user.email
    },

    [getUserProfile.rejected]: (state, action) => {
      setCookie('access', false)
      state.loginState = false
      localStorage.removeItem('refreshToken')
    },
  },
  reducers: {
    checkAuth(state) {
      const cookie = getCookie('access') !== 'false'
      state.loginState = cookie
    },
  },
})

export const { checkAuth } = profileSlice.actions

export const profileReducer = profileSlice.reducer
