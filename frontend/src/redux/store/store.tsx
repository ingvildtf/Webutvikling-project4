import { createStore, applyMiddleware } from 'redux'
import rootReducer from './configureStore'


//STORE - globalized state, holds all the data and state for the application 
//ACTION - describes what you want to do 
//REDUCER - describes how your action transform your state into the next state, check which action you did, and based on the action the reducer are going to modifie the store
//DISPATCH - execute the action to the reducer. Say dispatch this action to the reducer, the reducer will check what to do and the store gets updated 



//ReturnType grabs the return type of whats in the parameter
export type AppState = ReturnType<typeof rootReducer>

/*
Bruk dette i på de forskjellige sidene. OBS! husk at den må importeres
(import AppState fomr '..noe/store')

-----> Recipe:

const decendingSort = useSelector(
    (state: AppState) => state.recipesReducer.sortDecending
  )

-----> RecipeDisplay
  const query = useSelector(
    (state: AppState) => state.recipesReducer.query
  )
  const sortDecending: Boolean = useSelector(
    (state: AppState) => state.recipesReducer.sortDecending
  )
  const searchField: String = useSelector(
    (state: AppState) => state.recipesReducer.search
  )
  const pageOffset = useSelector(
    (state: AppState) => state.pageReducer.pageOffset
  )
  const pageSize = useSelector(
    (state: AppState) => state.pageReducer.pageSize
  )
  const pageNumber = useSelector(
    (state: AppState) => state.pageReducer.pageNumber
  )
  const dispatch = useDispatch()



*/

const store = createStore(rootReducer, applyMiddleware())
//Må det egt bruke thunk? eller promise?

export default store
