import { gql } from '@apollo/client'

//Interface for typescript use with Apollo client and graphql
export interface RecipesInterface {
  ID: string
  Name: string
  Category: string
  Instruction: string
  Ingredients: string
  Image: string
  Review: number | undefined | null[]
}

export type RecipeInterfaceData =
  | AllRecipesInterface
  | DinnerRecipesInterface
  | DessertRecipesInterface
  | BreakfastRecipesInterface
  | SearchRecipesInterface

export interface AllRecipesInterface {
  recipes: RecipesInterface[]
}
export interface DinnerRecipesInterface {
  dinner: RecipesInterface[]
}
export interface DessertRecipesInterface {
  dessert: RecipesInterface[]
}
export interface BreakfastRecipesInterface {
  breakfast: RecipesInterface[]
}

export interface SearchRecipesInterface {
  searchRecipes: RecipesInterface[]
}

export interface RecipesInterfaceVars {
  matchedString: String
  offset: number
  limit: number
  sortDecending: number
}

//graphql queries using Apollo client
export const GET_RECIPE_QUERY = gql`
  query Recipes($offset: Int, $limit: Int, $sortDecending: Int) {
    recipes(limit: $limit, offset: $offset, sortDecending: $sortDecending) {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
      Review
    }
  }
`

export const GET_DINNER_RECIPES = gql`
  query Dinners($offset: Int, $limit: Int, $sortDecending: Int) {
    dinner(limit: $limit, offset: $offset, sortDecending: $sortDecending) {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
      Review
    }
  }
`

export const GET_DESSERT_RECIPES = gql`
  query Desserts($offset: Int, $limit: Int, $sortDecending: Int) {
    dessert(limit: $limit, offset: $offset, sortDecending: $sortDecending) {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
      Review
    }
  }
`

export const GET_BREAKFAST_RECIPES = gql`
  query Breakfasts($offset: Int, $limit: Int, $sortDecending: Int) {
    breakfast(limit: $limit, offset: $offset, sortDecending: $sortDecending) {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
      Review
    }
  }
`
export const SEARCH_RECIPES = gql`
  query SearchRecipesQuery(
    $matchedString: String
    $offset: Int
    $limit: Int
    $sortDecending: Int
  ) {
    searchRecipes(
      searchSequence: $matchedString
      limit: $limit
      offset: $offset
      sortDecending: $sortDecending
    ) {
      ID
      Name
      Category
      Instruction
      Ingredients
      Image
      Review
    }
  }
`

export const ADD_REVIEW = gql`
  mutation AddReview($matchedString: String!, $addReview: Int) {
    addReview(id: $matchedString, star: $addReview) {
      ID
      Review
    }
  }
`

export const GET_REVIEWS = gql`
  query GetReview($matchedString: String!, $offset: Int) {
    reviews(id: $matchedString, offset: $offset) {
      ID
      Review
    }
  }
`
