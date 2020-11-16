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

/*
Bruk dette i på de forskjellige sidene. OBS! husk at den må importeres
(import AppState fomr '..noe/store')

/*
const store: Store<AppState, ActionTypes> & {
  dispatch: ActionTypes
} = createStore(rootReducer, applyMiddleware(thunk))
*/

const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, ActionTypes>)
)
//const store = createStore(rootReducer, applyMiddleware())
//Må det egt bruke thunk? eller promise?

export default store
