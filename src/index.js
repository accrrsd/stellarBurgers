// import React from 'react'
// import ReactDOM from 'react-dom'
// import './fonts/jetBrainsFont.css'
// import App from './components/app/app'

// ReactDOM.render(<App />, document.getElementById('root'))

import App from './components/app/app'
import './fonts/jetBrainsFont.css'
import { createRoot } from 'react-dom/client'
const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)
