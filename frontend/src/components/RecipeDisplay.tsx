import React, { useState } from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { DocumentNode, gql, useQuery } from '@apollo/client'
import { useSelector, useDispatch } from 'react-redux'

import { AppState } from '../redux/store/store'
import {
  GET_RECIPE_QUERY,
  RecipesInterfaceVars,
  RecipeInterfaceData,
  GET_DINNER_RECIPES,
  GET_BREAKFAST_RECIPES,
  GET_DESSERT_RECIPES,
  SEARCH_RECIPES,
} from '../queries'

import { resetThePage } from '../redux/actions/pageAction'
import recipeReducer, { recipeState } from '../redux/reducers/recipeReducer'
import reviewReducer, { reviewState } from '../redux/reducers/reviewReducer'
import pageReducer, { pageState } from '../redux/reducers/pageReducer'
import { startsWith } from 'cypress/types/lodash'
import { addRating } from '../redux/actions/reviewAction'
import { incrementThePage } from '../redux/actions/pageAction'

//Styling using styled components
export const Wrapper = styled.View`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`
interface RecipeCardProps {
  title?: string
  content?: string
  image?: string
  className?: string
}

const RecipeCard = styled.View<RecipeCardProps>`
  width: 49%;
  margin: 2px 0.5px 0 0;
  background-color: #eff1ee;
  font-size: 14px;
  text-align: center;
`

const CardImage = styled.Image`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
`

const CardTitle = styled.Text<RecipeCardProps>`
  font-size: 18px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1px 0 1px;
`

const CardRatingWrapper = styled.View<RecipeCardProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1px 1px 1px;
`

const RecipeDisplay = () => {
  const [activeRecipe, setActiveRecipe] = useState()
  /*
 useEffect(() => {
   if (activeRecipe !== undefined) openModal()
 }, [activeRecipe])
 */

  //Fetching data from global storage with redux
  const query = useSelector<AppState, DocumentNode>(
    state => state.recipesReducer.query
  )
  const sortDecending = useSelector<AppState, boolean>(
    state => state.recipesReducer.sortDecending
  )
  const searchField = useSelector<AppState, String>(
    state => state.recipesReducer.search
  )
  const pageOffset = useSelector<AppState, number>(
    state => state.pageReducer.pageOffset
  )
  const pageSize = useSelector<AppState, number>(
    state => state.pageReducer.pageSize
  )
  const pageNumber = useSelector<AppState, number>(
    state => state.pageReducer.pageNumber
  )
  const dispatch = useDispatch()

  //Fetching data from backend by using Apollo Client
  const { data, loading, error } = useQuery<
    RecipeInterfaceData,
    RecipesInterfaceVars
  >(query, {
    variables: { offset: 0, limit: 15, sortDecending: -1 },
  })

  const activateRecipe = (recipe: any) => {
    setActiveRecipe(recipe)
    dispatch(addRating(recipe.ID))
  }

  return (
    <Wrapper>
      {data != undefined ? (
        <FlatList
          data={data.recipes}
          renderItem={({ item }) => (
            <RecipeCard>
              <CardImage
                source={{
                  uri: item.Image,
                }}
                style={{ width: 400, height: 400 }}
              />
              <CardTitle>{item.Name}</CardTitle>
            </RecipeCard>
          )}
          keyExtractor={recipe => recipe.ID}
        ></FlatList>
      ) : (
        <CardTitle>Undefined</CardTitle>
      )}
    </Wrapper>
  )
}

export default RecipeDisplay
