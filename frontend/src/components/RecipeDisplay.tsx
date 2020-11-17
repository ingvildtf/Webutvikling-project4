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
    </Wrapper>
  )
}

export default RecipeDisplay
