import { createStore } from 'redux'
import reducer from './reducer'
import initialState from './initial-state'

export default createStore(reducer, initialState)
