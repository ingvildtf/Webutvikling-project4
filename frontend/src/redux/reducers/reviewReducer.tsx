import { addReview, ADD_REVIEW, ActionTypes } from '../actions/types'


export interface reviewState {
    recipeID: String
}

const initialState : reviewState = {
    recipeID: ''
}

export default function reviewReducer(
    state = initialState,
    action : ActionTypes
): reviewState{
    switch (action.type) {
        case ADD_REVIEW:
          return{
            ...state,
            recipeID: action.payload,
          }
        default:
          return state
      }
}

