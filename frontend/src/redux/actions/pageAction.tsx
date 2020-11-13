import {incrementPage, INCREMENT_PAGE, resetPage, RESET_PAGE, ActionTypes} from './types'


export function incrementThePage () : ActionTypes {
    return {
      type: INCREMENT_PAGE
      //payload
    }
  }
  
  export function resetThePage () : ActionTypes{
    return {
      type: RESET_PAGE
      //payload:
    }
  }


