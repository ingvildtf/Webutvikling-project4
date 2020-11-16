import { combineReducers } from 'redux'
import recipeReducer from '../reducers/recipeReducer'
import pageReducer from '../reducers/pageReducer'
import reviewReducer from '../reducers/reviewReducer'

//combines all the reducers if we would have more
const rootReducer = combineReducers({
  recipesReducer: recipeReducer,
  pageReducer: pageReducer,
  reviewReducer: reviewReducer,
})

export default rootReducer
