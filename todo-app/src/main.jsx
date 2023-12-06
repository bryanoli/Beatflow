import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/styles.css'
import { DataLayer } from "./DataLayer";
import reducer, {initialState} from './reducer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
    {/* <BrowserRouter> */}
    {/* <AuthProvider> */}
    <App />
    {/* </AuthProvider> */}
    {/* </BrowserRouter> */}
    </DataLayer>
  </React.StrictMode>,
)
