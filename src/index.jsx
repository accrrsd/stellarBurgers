import { configureStore } from '@reduxjs/toolkit'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './components/app/app'
import './fonts/jetBrainsFont.css'
import { rootReducer as reducer } from './services/reducers'

const store = configureStore({ reducer })

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
