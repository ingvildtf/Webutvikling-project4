import React from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { gql, useQuery } from '@apollo/client'

import { GET_RECIPE_QUERY } from '../queries'

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

//Test-kode
const recipes = [
  {
    name: 'Pizzabolle',
    content: [
      {
        imageUrl:
          'https://brands-a.prod.onewp.net/app/uploads/sites/4/2018/09/Pizzaboller.jpg',
        time: '1 hour',
        description: 'Not healthy, but good as hell.',
      },
    ],
  },
  {
    name: 'Tomatsuppe',
    content: [
      {
        imageUrl:
          'https://idagranjansen.com/wp-content/uploads/tomatsuppe__p2b6663.jpg',
        time: '2 hours',
        description: 'This is the perfect dish.',
      },
    ],
  },
]

//Interface for typescript use with Apollog client and graphql
interface RecipesInterface {
  ID: string
  Name: string
  Category: string
  Instruction: string
  Ingredients: string
  Image: string
  Review: number | undefined | null[]
}
interface RecipeInterfaceData {
  recipes: RecipesInterface[]
}

interface RecipesInterfaceVars {
  offset: number
  limit: number
  sortDecending: number
}

//Fetching data from backend by using Apollo Client
const RecipeDisplay = () => {
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

  return (
    <Wrapper>
      {data != undefined ? (
        <FlatList
          data={data.recipes}
          renderItem={({ item }) => <CardTitle>{item.Name}</CardTitle>}
          keyExtractor={recipe => recipe.ID}
        ></FlatList>
      ) : (
        <CardTitle>Undefined</CardTitle>
      )}

      <RecipeCard onClick={() => {}}>
        <CardImage
          source={{
            uri:
              'https://brands-a.prod.onewp.net/app/uploads/sites/4/2018/09/Pizzaboller.jpg',
          }}
          style={{ width: 400, height: 400 }}
        />
        <CardTitle>{recipes[0].name}</CardTitle>
      </RecipeCard>
      <RecipeCard onClick={() => {}}>
        <CardImage
          source={{ uri: recipes[0].content[0].imageUrl }}
          style={{ width: 400, height: 400 }}
        />
        <CardTitle>{recipes[1].name}</CardTitle>
      </RecipeCard>
      <RecipeCard onClick={() => {}}>
        <CardImage
          source={{
            uri:
              'https://brands-a.prod.onewp.net/app/uploads/sites/4/2018/09/Pizzaboller.jpg',
          }}
          style={{ width: 400, height: 400 }}
        />
        <CardTitle>{recipes[1].name}</CardTitle>
      </RecipeCard>
      <RecipeCard onClick={() => {}}>
        <CardImage
          source={{
            uri:
              'https://brands-a.prod.onewp.net/app/uploads/sites/4/2018/09/Pizzaboller.jpg',
          }}
          style={{ width: 400, height: 400 }}
        />
        <CardTitle>{recipes[1].name}</CardTitle>
      </RecipeCard>
    </Wrapper>
  )
}

export default RecipeDisplay
