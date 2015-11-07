import React from 'react'
import { render } from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect, Provider } from 'react-redux'

import App from './app'
import store from './core/store'
import * as Actions from './core/actions'
import './core/backend'

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

render(<Provider store={store}>
  <ConnectedApp/>
</Provider>, document.getElementById('main'))

function mapStateToProps (state) {
  return state
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(Actions, dispatch)
}
