import React from 'react'
import { NativeRouter, Route } from 'react-router-native'
import styled from 'styled-components/native'
import { ApolloProvider } from '@apollo/client'

import Recipes from './src/components/Recipes'
import client from './src/initApollo'

//Styled components with react native
const Wrapper = styled.View`
  display: flex;
  font-family: sans-serif;
`

const Title = styled.Text`
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
  padding: 40px 0 0 20px;
  text-align: left;
  font-size: 25px;
  background-color: #607878;
  color: white;
`

//Our app is implemented with Router for react native
function App() {
  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <Title>A RECIPE FOR SUCCESS</Title>
        <NativeRouter>
          <Route exact path="/" component={Recipes} />
        </NativeRouter>
      </Wrapper>
    </ApolloProvider>
  )
}

export default App
