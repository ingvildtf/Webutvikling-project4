import { createStore, applyMiddleware, Store } from 'redux'
import rootReducer from './configureStore'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { ActionTypes } from '../actions/types'

//STORE - globalized state, holds all the data and state for the application
//ACTION - describes what you want to do
//REDUCER - describes how your action transform your state into the next state, check which action you did, and based on the action the reducer are going to modifie the store
//DISPATCH - execute the action to the reducer. Say dispatch this action to the reducer, the reducer will check what to do and the store gets updated

//ReturnType grabs the return type of whats in the parameter
export type AppState = ReturnType<typeof rootReducer>

//initialiserer global store til å inneholde de forskjellige reducerne
const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, ActionTypes>)
)

export default store
