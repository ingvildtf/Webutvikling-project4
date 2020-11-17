import React, { useState } from 'react'
import styled from 'styled-components/native'
import { FlatList, Modal, Alert, View } from 'react-native'
import { DocumentNode, useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'

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
  width: 50%;
  margin: 2px 0.5px 0 0;
  background-color: white;
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
  color: #3c4560;
  font-weight: 600;
`

const CardRatingWrapper = styled.View<RecipeCardProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1px 1px 1px;
`

const Container = styled.View`
  padding: 0%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

//Card style
const CardContainer = styled.View<RecipeCardProps>`
  background: #fff;
  height: 200px;
  width: 150px;
  border-radius: 14px;
  margin: 18px;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`

const CardCover = styled.View<RecipeCardProps>`
  display: flex;
  width: 100%;
  height: 120px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`

const CardContent = styled.View<RecipeCardProps>`
  display: flex;
  padding-top: 10px;
  flex-direction: column;
  align-items: center;
  height: 60px;
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

  //Fetching data from backend by using Apollo Client
  const { data, loading, error, fetchMore } = useQuery<
    RecipeInterfaceData,
    RecipesInterfaceVars
  >(query, {
    variables: {
      matchedString: searchField,
      offset: pageOffset,
      limit: pageSize,
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

  //Pagination, fetches more recipes from database
  const fetchMoreRecipes = () => {
    data != undefined
      ? fetchMore({
          variables: {
            offset: queryName(query).length + 1,
            limit: pageSize,
            sortDecending: sortDecending ? -1 : 1,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return prev
            }
            switch (query) {
              case GET_RECIPE_QUERY:
                return {
                  recipes: (prev as AllRecipesInterface).recipes.concat(
                    (fetchMoreResult as AllRecipesInterface).recipes
                  ),
                }
              case GET_DINNER_RECIPES:
                return {
                  dinner: (prev as DinnerRecipesInterface).dinner.concat(
                    (fetchMoreResult as DinnerRecipesInterface).dinner
                  ),
                }
              case GET_BREAKFAST_RECIPES:
                return {
                  breakfast: (prev as BreakfastRecipesInterface).breakfast.concat(
                    (fetchMoreResult as BreakfastRecipesInterface).breakfast
                  ),
                }
              case GET_DESSERT_RECIPES:
                return {
                  dessert: (prev as DessertRecipesInterface).dessert.concat(
                    (fetchMoreResult as DessertRecipesInterface).dessert
                  ),
                }
              case SEARCH_RECIPES:
                return {
                  searchRecipes: (prev as SearchRecipesInterface).searchRecipes.concat(
                    (fetchMoreResult as SearchRecipesInterface).searchRecipes
                  ),
                }
              default:
                return {
                  recipes: (prev as AllRecipesInterface).recipes.concat(
                    (fetchMoreResult as AllRecipesInterface).recipes
                  ),
                }
            }
          },
        })
      : null
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
        {data != undefined ? (
          <FlatList
            data={queryName(query)}
            numColumns={2}
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
                  style={{ width: 150, height: 150 }}
                />
                <CardTitle>{item.Name}</CardTitle>
              </RecipeCard>
            )}
            keyExtractor={recipe => recipe.ID}
            onEndReached={fetchMoreRecipes}
            onEndReachedThreshold={0.5}
            indicatorStyle={'black'}
          />
        ) : (
          <View>
            <CardTitle>Undefined</CardTitle>
          </View>
        )}
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
