import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components/native'
import { CheckBox } from 'react-native-elements'
//import { Image } from 'react-native'
import { Keyboard, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import recipeReducer, { recipeState } from '../redux/reducers/recipeReducer'
import reviewReducer, { reviewState } from '../redux/reducers/reviewReducer'
import pageReducer, { pageState } from '../redux/reducers/pageReducer'
import { AppState } from '../redux/store/store'
import { ActionTypes } from '../redux/actions/types'

import RecipeDisplay from './RecipeDisplay'
import { resetThePage } from '../redux/actions/pageAction'
import {
  fetchAllTheRecipes,
  fetchTheDinnerRecipes,
  fetchTheBreakfastRecipes,
  fetchTheDessertRecipes,
  filterTheRecipes,
  sortItDecending,
} from '../redux/actions/recipeAction'

const Wrapper = styled.View`
  margin: 1%;
  display: flex;
`
//Wraps button and styled searchbar
const SearchBarWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
`

const Button = styled.TouchableOpacity`
  background-color: #607878;
  height: 100%;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledText = styled.Text`
  font-size: 20px;
  color: white;
`
const StyledSearchBar = styled.TextInput`
  width: 80%;
  height: 100%;
  background-color: white;
  font-size: 17px;
  color: #afc9be;
  border: 2px solid #607878;
  display: flex;
  text-align: center;
`
const Categories = styled.View`
  padding-right: 10px;
  text-decoration: none;
  background-color: lightblue;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const Recipe = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Recipes: React.FunctionComponent = () => {
  const [dinnerActiveRecipe, setActiveDinner] = useState(false)
  const [breafastActiveRecipe, setActiveBreakfast] = useState(false)
  const [dessertActiveRecipe, setActiveDessert] = useState(false)

  const dispatch = useDispatch()

  const sortDecending = useSelector<AppState, boolean>(
    state => state.recipesReducer.sortDecending
  )

  //Handling search-input
  let search = ''
  const filteredByInput = (e: React.KeyboardEvent) => {
    console.log(e.key)
    if (e.key.length < 2) {
      search += e.key
    }
    if (e.key === 'Backspace') {
      let word = search
      search = ''
      for (let i = 0; i < word.length - 1; i++) {
        search += word.charAt(i)
      }
    }
    console.log(search)
  }

  const searchHandler = () => {
    dispatch(resetThePage())
    dispatch(filterTheRecipes(search))
    setActiveDinner(false)
    setActiveBreakfast(false)
    setActiveDessert(false)
  }

  //Handling checbox-input, displaying active categories
  const onClick = (action: any) => {
    switch (action) {
      case 'dinner':
        dispatch(resetThePage())
        dispatch(fetchTheDinnerRecipes())
        setActiveDinner(true)
        setActiveBreakfast(false)
        setActiveDessert(false)
        return
      case 'breakfast':
        dispatch(resetThePage())
        dispatch(fetchTheBreakfastRecipes())
        setActiveDinner(false)
        setActiveBreakfast(true)
        setActiveDessert(false)
        return
      case 'dessert':
        dispatch(resetThePage())
        dispatch(fetchTheDessertRecipes())
        setActiveDinner(false)
        setActiveBreakfast(false)
        setActiveDessert(true)
        return
      case 'allRecipes':
        dispatch(resetThePage())
        dispatch(fetchAllTheRecipes())
        setActiveDinner(false)
        setActiveBreakfast(false)
        setActiveDessert(false)
        return
      default:
        return
    }
  }

  // onChangeText={e => filteredByInput(e)}

  //onPress={() => searchHandler()}
  return (
    <Wrapper>
      <SearchBarWrapper>
        <StyledSearchBar placeholder="What would you like?" />
        <Button>
          <StyledText>SEARCH</StyledText>
        </Button>
      </SearchBarWrapper>

      <Categories>
        <CheckBox
          center
          title="Dinner"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={dinnerActiveRecipe}
          onPress={() => {
            dinnerActiveRecipe ? onClick('allRecipes') : onClick('dinner')
          }}
          checkedColor="#607878"
        />
        <CheckBox
          center
          title="Breakfast"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={breafastActiveRecipe}
          onPress={() => {
            breafastActiveRecipe ? onClick('allRecipes') : onClick('breakfast')
          }}
          checkedColor="#607878"
        />
        <CheckBox
          center
          title="Dessert"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={dessertActiveRecipe}
          onPress={() => {
            dessertActiveRecipe ? onClick('allRecipes') : onClick('dessert')
          }}
          checkedColor="#607878"
        />
      </Categories>
      <Recipe>
        <RecipeDisplay />
      </Recipe>
    </Wrapper>
  )
}

export default Recipes
