import {
  FETCH_ALL_RECIPES,
  fetchAllRecipes,
  FETCH_DINNER_RECIPES,
  fetchDinnerRecipes,
  FETCH_BREAKFAST_RECIPES,
  fetchBreakfastRecipes,
  FETCH_DESSERT_RECIPES,
  fetchDessertRecipes,
  FILTER_RECIPES,
  filterRecipes,
  SORT_DECENDING,
  sortDecending,
  ActionTypes,
} from './types'

//actions for handling recipes queries

export function fetchAllTheRecipes(): ActionTypes {
  return {
    type: FETCH_ALL_RECIPES,
  }
}

export function fetchTheDinnerRecipes(): ActionTypes {
  return {
    type: FETCH_DINNER_RECIPES,
  }
}

export function fetchTheBreakfastRecipes(): ActionTypes {
  return {
    type: FETCH_BREAKFAST_RECIPES,
  }
}

export function fetchTheDessertRecipes(): ActionTypes {
  return {
    type: FETCH_DESSERT_RECIPES,
  }
}

export function filterTheRecipes(filterRecipes: string): ActionTypes {
  return {
    type: FILTER_RECIPES,
    payload: filterRecipes,
  }
}

export function sortItDecending(sortDecending: boolean): ActionTypes {
  return {
    type: SORT_DECENDING,
    payload: sortDecending,
  }
}
