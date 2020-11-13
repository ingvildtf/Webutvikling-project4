import React from 'react';
import styled from 'styled-components/native'

const Wrapper = styled.View `
    margin: 5vw;
    display: flex;
    background: white;
    align-content: space-between;
    justify-content: space-between;
`

const Button = styled.TouchableOpacity`
    color: white;
    background-color: #607878;
    height: 50px;
    width: 12vw; 
    cursor: pointer;
    font-family: sans-serif;
    outline: none; 
`
const ButtonArea = styled.View `
    position: relative;
    display: flex;
    justify-content: flex-end;
`

const SearchBar = styled.TextInput`
    width: 72vw;
    height: 100%;
    font-size: 17px;
    font-family: sans-serif;
    border: 1px solid transparent;
    color: #afc9be;
    border-bottom: 1px solid #607878;

    &:focus {
        outline: none; 
    }
`

const Container = styled.View `
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Title = styled.Text `
    font-size: 20px; 
    color: black;
    margin: 20px;
`

export default function Recipes() {
    return (
        <Container>
            <Title>Hei</Title>
        </Container>
    )
}