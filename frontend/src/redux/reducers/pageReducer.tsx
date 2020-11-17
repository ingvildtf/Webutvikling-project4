import { INCREMENT_PAGE, RESET_PAGE, ActionTypes } from '../actions/types'

export interface pageState {
  pageOffset: number
  pageNumber: number
  pageSize: number
}

const initialState: pageState = {
  pageOffset: 0,
  pageNumber: 1,
  pageSize: 15,
}

export default function pageReducer(
  state = initialState,
  action: ActionTypes
): pageState {
  switch (action.type) {
    case INCREMENT_PAGE:
      return {
        ...state,
        pageOffset: state.pageNumber * state.pageSize,
        pageNumber: state.pageNumber + 1,
      }
    case RESET_PAGE:
      return {
        ...state,
        pageOffset: 0,
        pageNumber: 1,
      }
    default:
      return state
  }
}
