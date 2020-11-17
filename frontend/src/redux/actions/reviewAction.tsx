import {addReview, ADD_REVIEW, ActionTypes} from './types'

export function addRating (addReview: string) : ActionTypes {
    return {
      type: ADD_REVIEW,
      payload: addReview
    }
}