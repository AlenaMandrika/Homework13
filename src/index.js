import React from 'react'
import ReactDOM from 'react-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import './index.css'
import App from './App'



import configureStore from './configureStore'
let { store, persistor } = configureStore()

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
