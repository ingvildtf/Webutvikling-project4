import {
  incrementPage,
  INCREMENT_PAGE,
  resetPage,
  RESET_PAGE,
  ActionTypes,
} from './types'

//Actions for handling resetting the page when new categorie is choosen or new search input, and handling pagination with increase in pagenumber and offset
export function incrementThePage(): ActionTypes {
  return {
    type: INCREMENT_PAGE,
    //payload
  }
}

export function resetThePage(): ActionTypes {
  return {
    type: RESET_PAGE,
    //payload:
  }
}
