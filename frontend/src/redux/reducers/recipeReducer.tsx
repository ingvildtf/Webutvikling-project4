import {
  FETCH_ALL_RECIPES,
  FETCH_DINNER_RECIPES,
  FETCH_BREAKFAST_RECIPES,
  FETCH_DESSERT_RECIPES,
  FILTER_RECIPES,
  SORT_DECENDING,
  ActionTypes,
} from '../actions/types'
import {
  GET_RECIPE_QUERY,
  GET_DINNER_RECIPES,
  GET_BREAKFAST_RECIPES,
  GET_DESSERT_RECIPES,
  SEARCH_RECIPES,
  RecipeInterfaceData,
} from '../../queries'
import { DocumentNode } from 'graphql'

//interface for typescript
export interface recipeState {
  query: DocumentNode
  search: String
  activeRecipe: String
  sortDecending: boolean
}

//initial state includes the query that fetches all recipes
const initialState: recipeState = {
  query: GET_RECIPE_QUERY,
  search: '',
  activeRecipe: '',
  sortDecending: false,
}

//Sets state to different queries according to user input, either filtering on categories, searching on name, or sorting the data
export default function recipeReducer(
  state: recipeState = initialState,
  action: ActionTypes
): recipeState {
  switch (action.type) {
    case FETCH_ALL_RECIPES:
      return {
        ...state,
        query: GET_RECIPE_QUERY,
      }
    case FETCH_DINNER_RECIPES:
      return {
        ...state,
        query: GET_DINNER_RECIPES,
      }
    case FETCH_BREAKFAST_RECIPES:
      return {
        ...state,
        query: GET_BREAKFAST_RECIPES,
      }
    case FETCH_DESSERT_RECIPES:
      return {
        ...state,
        query: GET_DESSERT_RECIPES,
      }
    case FILTER_RECIPES:
      return {
        ...state,
        search: action.payload,
        query: SEARCH_RECIPES,
      }
    case SORT_DECENDING:
      return {
        ...state,
        sortDecending: action.payload,
      }
    default:
      return state
  }
}
