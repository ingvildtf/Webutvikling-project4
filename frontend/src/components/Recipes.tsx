import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components/native'
import { CheckBox } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'

import { AppState } from '../redux/store/store'

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
  font-size: 10px;
  color: white;
  text-align: center;
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
  padding: 5px;
  text-decoration: none;
  background-color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Recipe = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Recipes: React.FunctionComponent = () => {
  //local state to handel checkbox state for categories
  const [dinnerActiveRecipe, setActiveDinner] = useState(false)
  const [breafastActiveRecipe, setActiveBreakfast] = useState(false)
  const [dessertActiveRecipe, setActiveDessert] = useState(false)

  //dispatch function to handle state with redux
  const dispatch = useDispatch()

  //fetches global state from redux, that holds information if the recipes are going to be sorted in a descending order
  const sortDecending = useSelector<AppState, boolean>(
    state => state.recipesReducer.sortDecending
  )

  //Keps track on the text input in the search field
  const [value, onChangeText] = React.useState<string>('')

  //handels click on search button and textinput in search field, sets global state to querie that fetches recipes including text input in the title
  const searchHandler = () => {
    dispatch(resetThePage())
    dispatch(filterTheRecipes(value))
    setActiveDinner(false)
    setActiveBreakfast(false)
    setActiveDessert(false)
  }

  //handels change of text input in the searchfield, if its empty all recipes will be fetched, by setting global state to all recipes
  const changeText = (text: string) => {
    if (text === '') {
      dispatch(fetchAllTheRecipes())
    }
    onChangeText(text)
    searchHandler()
  }

  //Handling checbox-input, displaying active categories, allows only one category to be active
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

  return (
    <Wrapper>
      <SearchBarWrapper>
        <StyledSearchBar
          editable
          onChangeText={text => changeText(text)}
          placeholder="What would you like?"
          value={value}
        />
        <Button onPress={searchHandler}>
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
        <CheckBox
          center
          title="Sort Decending"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={sortDecending}
          onPress={() => {
            dispatch(sortItDecending(!sortDecending))
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
