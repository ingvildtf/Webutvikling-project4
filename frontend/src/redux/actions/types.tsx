

export const FETCH_ALL_RECIPES = 'FETCH_ALL_RECIPES'
export const FETCH_DINNER_RECIPES = 'FETCH_DINNER_RECIPES'
export const FETCH_BREAKFAST_RECIPES = 'FETCH_BREAKFAST_RECIPES'
export const FETCH_DESSERT_RECIPES = 'FETCH_DESSERT_RECIPES'
export const FILTER_RECIPES = 'FILTER_RECIPES'
export const INCREMENT_PAGE = 'INCREMENT_PAGE'
export const ADD_REVIEW = 'ADD_REVIEW'
export const  RESET_PAGE = 'RESET_PAGE'
export const SORT_DECENDING = 'SORT_DECENDING'


export interface  fetchAllRecipes {
    type: typeof FETCH_ALL_RECIPES
    
}

export interface fetchDinnerRecipes {
    type: typeof FETCH_DINNER_RECIPES
    
}

export interface fetchBreakfastRecipes  {
    type: typeof FETCH_BREAKFAST_RECIPES
}

export interface fetchDessertRecipes {
    type: typeof FETCH_DESSERT_RECIPES
}

export interface incrementPage  {
    type: typeof INCREMENT_PAGE
}
  
export interface resetPage {
    type: typeof RESET_PAGE

}

export interface addReview{
    type: typeof ADD_REVIEW
    payload: string
}


export interface sortDecending {
    type: typeof SORT_DECENDING
    payload: boolean
}


export interface filterRecipes {
    type: typeof FILTER_RECIPES
    payload: string
}

//DIFFERENT TYPES
export type recipeTypes = fetchAllRecipes | fetchDinnerRecipes | fetchBreakfastRecipes | fetchDessertRecipes | incrementPage | resetPage  | fetchAllRecipes | fetchDinnerRecipes
export type pageTypes = sortDecending | filterRecipes
export type reviewTypes =  addReview 
//ALL TYPES
export type ActionTypes = recipeTypes | pageTypes | reviewTypes