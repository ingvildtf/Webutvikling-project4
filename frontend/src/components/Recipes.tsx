import React from 'react';
import styled from 'styled-components/native'

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