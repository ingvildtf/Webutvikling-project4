import React, { useState } from 'react'
import styled from 'styled-components/native'
import { FlatList, Modal, Alert } from 'react-native'
import { DocumentNode, gql, useQuery } from '@apollo/client'
import { useSelector, useDispatch } from 'react-redux'

import { AppState } from '../redux/store/store'
import {
  GET_RECIPE_QUERY,
  RecipesInterfaceVars,
  RecipeInterfaceData,
  RecipesInterface,
  GET_DINNER_RECIPES,
  GET_BREAKFAST_RECIPES,
  GET_DESSERT_RECIPES,
  SEARCH_RECIPES,
  AllRecipesInterface,
  DinnerRecipesInterface,
  BreakfastRecipesInterface,
  DessertRecipesInterface,
  SearchRecipesInterface,
} from '../queries'
import { ScrollView } from 'react-native-gesture-handler'

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

const RecipeCard = styled.TouchableOpacity<RecipeCardProps>`
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

const Container = styled.View`
  padding: 2%;
`

//Modal style
const CenterdView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`

const ModalView = styled.View`
  margin: 20px;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 0px;
  align-items: center;
  height: 70%;
  width: 90%;
  overflow: scroll;
  overflow: visible;
  shadow-color: black;
  shadow-opacity: 0.9;
  shadow-radius: 30;
`

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background-color: #afc9be;
`

const ModalTitle = styled.Text`
  color: white;
  font-size: 18px;
`

const CloseButton = styled.TouchableHighlight`
  width: 15%;
  border-radius: 3px;
  margin-left: 0.5px;
`
const CloseText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`

export const Picture = styled.Image`
  width: 100%;
  height: 40%;
  padding: 5%;
  background-color: #f2f2f2;
`

export const Content = styled.View`
  width: 100%;
  padding: 3%;
  overflow: hidden;
  background-color: #f2f2f2;
  color: black;
  display: flex;
  align-items: center;
`

export const Recipe = styled.View`
  width: 100%;
  padding: 3%;
  background-color: #f2f2f2;
  color: black;
  overflow: hidden;
`
const ModalText = styled.Text`
  font-size: 18px;
  color: black;
`

const RecipeDisplay = () => {
  //local state to handle if the modal should be visible or not
  const [modalVisible, setModalVisible] = useState(false)
  //local state to handle choosen recipe
  const [activeRecipe, setActiveRecipe] = useState<RecipesInterface>()

  //helper function for when a recipe i clicked, sets active recipe to be the recipe that is choosen and activates the modal
  const activateRecipe = (recipe: RecipesInterface) => {
    setModalVisible(true)
    setActiveRecipe(recipe)
    //dispatch(addRating(recipe.ID))
  }

  //Fetching data from global storage with redux
  let query = useSelector<AppState, DocumentNode>(
    state => state.recipesReducer.query
  )
  const sortDecending = useSelector<AppState, boolean>(
    state => state.recipesReducer.sortDecending
  )
  const searchField = useSelector<AppState, String>(
    state => state.recipesReducer.search
  )
  console.log(searchField)
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
    variables: {
      matchedString: searchField,
      offset: 0,
      limit: 15,
      sortDecending: sortDecending ? -1 : 1,
    },
  })

  if (loading)
    return (
      <CardRatingWrapper>
        <CardTitle>Loading...</CardTitle>
      </CardRatingWrapper>
    )
  if (error) {
    console.log(error)
    return (
      <CardRatingWrapper>
        <CardTitle>Error!</CardTitle>
      </CardRatingWrapper>
    )
  }

  //Helper funciton to fetch the right queryName from graphql
  const queryName = (query: DocumentNode) => {
    switch (query) {
      case GET_RECIPE_QUERY:
        return Object((data as AllRecipesInterface).recipes)
      case GET_DINNER_RECIPES:
        return Object((data as DinnerRecipesInterface).dinner)
      case GET_BREAKFAST_RECIPES:
        return Object((data as BreakfastRecipesInterface).breakfast)
      case GET_DESSERT_RECIPES:
        return Object((data as DessertRecipesInterface).dessert)
      case SEARCH_RECIPES:
        return Object((data as SearchRecipesInterface).searchRecipes)
      default:
        return Object((data as AllRecipesInterface).recipes)
    }
  }

  return (
    <Wrapper>
      <Container>
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
          {data != undefined ? (
            <FlatList
              data={queryName(query)}
              renderItem={({ item }) => (
                <RecipeCard
                  onPress={() => {
                    activateRecipe(item)
                  }}
                >
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
        </ScrollView>
      </Container>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
        }}
      >
        {activeRecipe && (
          <CenterdView>
            <ModalView>
              <Header>
                <ModalTitle>{activeRecipe!.Name}</ModalTitle>
                <CloseButton
                  onPress={() => {
                    setModalVisible(!modalVisible)
                  }}
                >
                  <CloseText>X</CloseText>
                </CloseButton>
              </Header>
              <Picture
                source={{
                  uri: activeRecipe!.Image,
                }}
              />
              <ScrollView horizontal={false}>
                <Content>
                  <ModalText>{activeRecipe!.Ingredients}</ModalText>
                </Content>
                <Recipe>
                  <ModalText>{activeRecipe!.Instruction}</ModalText>
                </Recipe>
              </ScrollView>
            </ModalView>
          </CenterdView>
        )}
      </Modal>
    </Wrapper>
  )
}

export default RecipeDisplay
