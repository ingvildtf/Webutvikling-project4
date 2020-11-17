import React, { useState } from 'react'
import styled from 'styled-components/native'
import { FlatList, Modal, Alert, ActivityIndicator } from 'react-native'
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
  width: 5%;
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
  width:100%;
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
  const [modalVisible, setModalVisible] = useState(false)

  const [activeRecipe, setActiveRecipe] = useState<RecipesInterface>()

  const activateRecipe = (recipe: RecipesInterface) => {
    setModalVisible(true)
    setActiveRecipe(recipe)
    //dispatch(addRating(recipe.ID))
  }

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
  const { data, loading, error, fetchMore } = useQuery<
    RecipeInterfaceData,
    RecipesInterfaceVars
  >(query, {
<<<<<<< HEAD
    variables: {
      offset: pageOffset,
      limit: pageSize,
      sortDecending: sortDecending ? 1 : -1,
    },
=======
    variables: { offset: 0, limit: 15, sortDecending: 1 },
>>>>>>> develop
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
    fetchMore({
      variables: {
        offset: pageSize * pageNumber,
        limit: pageSize,
        sortDecending: sortDecending ? -1 : 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          dispatch(incrementThePage())
          return prev
        }
        dispatch(incrementThePage())
        return Object.assign({}, prev, {
          recipes: [...prev.recipes, ...fetchMoreResult.recipes],
        })
      },
    })
  }

  return (
    <Wrapper>
      <Container>
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
          {data != undefined ? (
            <FlatList
              ListFooterComponent={() => <ActivityIndicator />}
              data={data.recipes}
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
              onEndReached={fetchMoreRecipes}
              onEndReachedThreshold={0}
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
                  <ModalText>{activeRecipe!.Ingredients.split(',')}</ModalText>
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
