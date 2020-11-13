import { combineReducers } from 'redux'
import recipeReducer from '../reducers/pageReducer'
import pageReducer from '../reducers/recipeReducer'
import reviewReducer from '../reducers/reviewReducer';

//combines all the reducers if we would have more
const rootReducer = combineReducers({
  recipesReducer: recipeReducer,
  pageReducer: pageReducer,
  reviewReducer: reviewReducer
})

export default rootReducer; 