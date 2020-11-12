import React from 'react'
import {NativeRouter, Route} from 'react-router-native'
import styled from 'styled-components/native'

import Recipes from './src/components/Recipes'

//Styled components with react native 
const Wrapper = styled.View`
  flex: 1; 
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center; 
`

const Title = styled.Text `
    font-size: 40px; 
    color: black;
    margin: 20px; 
`

//Our app is implemented with Router for react native
function App() {
  return (
      <Wrapper>
          <Title>Hello World</Title>
        <NativeRouter>
              <Route exact path="/" component={Recipes} />
        </NativeRouter>
      </Wrapper>
  )
}

export default App
