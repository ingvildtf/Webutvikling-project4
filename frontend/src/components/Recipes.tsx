import React from 'react';
import styled from 'styled-components/native'

import { useQuery, gql } from '@apollo/client'
import {GET_RECIPE_QUERY} from '../queries'
import {query} from '../recipesQueries'



const Container = styled.View `
  display: flex;
  align-items: center;
  justify-content: center;
`

const RecipeCard = styled.View `
width: 250px;

border-radius: 4px;
background-color: #f2f2f2;
font-size: 14px;
padding-top: 20px;
height: auto;


`

const Title = styled.Text `
    font-size: 20px; 
    color: black;
    margin: 20px;
`



export default function Recipes() {
    //Query for fetching data from database
    const { loading, error, data } = useQuery(query)
   console.log(data)
    return (
        <Container>
            {data.recipes.map((recipe: any) => (
                <RecipeCard>
            <Title>{recipe.Name}</Title>
            </RecipeCard>))}
        </Container>
        
    )
}