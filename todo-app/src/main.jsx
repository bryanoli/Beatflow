import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/styles.css'
import { DataLayer } from "./DataLayer";
import { VolumeLayer } from './volumeLayer.jsx';
import reducer, {initialState} from './reducer.jsx'
import volumeReducer, {volumeInitialState} from './volumeReducer.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
    {/* <BrowserRouter> */}
    {/* <AuthProvider> */}
    <VolumeLayer initialState={volumeInitialState} reducer={volumeReducer}>
    <App />
    </VolumeLayer>
    {/* </AuthProvider> */}
    {/* </BrowserRouter> */}
    </DataLayer>
  </React.StrictMode>,
)
