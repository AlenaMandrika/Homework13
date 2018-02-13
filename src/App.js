import React, { Component } from 'react'
import logo from './assets/logo.svg'
import './App.css'

import Form from './components/FormComponent/FormComponentContainer'
import Badge from './components/BadgeComponent/BadgeComponentContainer'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>User information</h1>
        </header>
        <Form />
        <Badge />
      </div>
    )
  }
}

export default App
