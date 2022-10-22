import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { HashRouter } from 'react-router-dom'

import { store } from './store/store'

import App from './components/app/app'
import './fonts/jetBrainsFont.css'
import './fonts/icelandFont.css'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <Provider store={store}>
    <HashRouter>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </HashRouter>
  </Provider>
)
