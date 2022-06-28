import { configureStore } from '@reduxjs/toolkit'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import App from './components/app/app'
import './fonts/jetBrainsFont.css'
import { rootReducer as reducer } from './services/reducers'

const store = configureStore({ reducer })
const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>
)
