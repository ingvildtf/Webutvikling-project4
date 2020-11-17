import React, { useState } from 'react'
import styled from 'styled-components/native'
import { FlatList, Modal, Alert } from 'react-native'
import { gql, useQuery } from '@apollo/client'

import {
  GET_RECIPE_QUERY,
  RecipesInterfaceVars,
  RecipeInterfaceData,
  RecipesInterface,
} from '../queries'
import { ScrollView } from 'react-native-gesture-handler'

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
  background-color: white;
  border-radius: 10px;
  padding: 0px;
  align-items: center;
  height: 70%;
  width: 90%;
  overflow: scroll;
`

const OpenButton = styled.TouchableHighlight`
  background-color: #f194ff;
  border-radius: 20px;
  padding: 10px;
`

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: #afc9be;
`

const ModalTitle = styled.Text`
  color: white;
  font-size: 18px;
`

const CloseButton = styled.TouchableHighlight`
  border: none;
  border-radius: 3px;
  margin-left: 0.5px;

  :hover {
    cursor: pointer;
  }
`
const CloseText = styled.Text`
  color: white;
  font-size: 18px;
`

export const Picture = styled.Image`
  width: 90%;
  height: 40%;
  padding: 5%;
  background-color: #f2f2f2;
`

export const Content = styled.View`
  padding: 5%;
  overflow: hidden;
  background-color: #f2f2f2;
  color: black;
  display: flex;
  align-items: center;
`

export const Recipe = styled.View`
  padding: 5%;
  background-color: #f2f2f2;
  color: black;
  overflow: hidden;
`
const ModalText = styled.Text`
  font-size: 18px;
  color: black;
`

//Fetching data from backend by using Apollo Client
const RecipeDisplay = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const { data, loading, error } = useQuery<
    RecipeInterfaceData,
    RecipesInterfaceVars
  >(GET_RECIPE_QUERY, {
    variables: { offset: 0, limit: 15, sortDecending: -1 },
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

  const [activeRecipe, setActiveRecipe] = useState<RecipesInterface>()

  const activateRecipe = (recipe: RecipesInterface) => {
    setModalVisible(true)
    setActiveRecipe(recipe)
  }

  return (
    <Wrapper>
      <Container>
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
          {data != undefined ? (
            <FlatList
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
