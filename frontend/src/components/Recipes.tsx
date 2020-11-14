import * as React from 'react'
import styled from 'styled-components/native'
import { CheckBox } from 'react-native-elements'
import RecipeDisplay from './RecipeDisplay'
import { Image } from 'react-native'

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
  return (
    <Wrapper>
      <SearchBarWrapper>
        <StyledSearchBar
          onKeyDown={() => {}}
          placeholder="What would you like?"
        />
        <Button type="submit" onClick={() => {}}>
          <StyledText>SEARCH</StyledText>
        </Button>
      </SearchBarWrapper>

      <Categories>
        <CheckBox
          center
          title="Dinner"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={false}
          checkedColor="#607878"
        />
        <CheckBox
          center
          title="Breakfast"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={true}
          checkedColor="#607878"
        />
        <CheckBox
          center
          title="Dessert"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={true}
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
