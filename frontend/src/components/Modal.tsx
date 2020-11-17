import React from 'react'
import styled from 'styled-components/native'

//Modal style
const CenterdView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`

const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 0px;
  align-items: center;
  height: 70%;
  width: 90%;
  overflow: scroll;
`

const OpenButton = styled.TouchableHighlight`
  background-color: #f194ff;
  border-radius: 20px;
  padding: 10px;
`

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: #afc9be;
`

const ModalTitle = styled.Text`
  color: white;
  font-size: 18px;
`

const CloseButton = styled.TouchableHighlight`
  border: none;
  border-radius: 3px;
  margin-left: 0.5px;

  :hover {
    cursor: pointer;
  }
`
const CloseText = styled.Text`
  color: white;
  font-size: 18px;
`

export const Picture = styled.Image`
  width: 90%;
  height: 40%;
  padding: 5%;
  background-color: #f2f2f2;
`

export const Content = styled.View`
  padding: 5%;
  overflow: hidden;
  background-color: #f2f2f2;
  color: black;
  display: flex;
  align-items: center;
`

export const Recipe = styled.View`
  padding: 5%;
  background-color: #f2f2f2;
  color: black;
  overflow: hidden;
`
const ModalText = styled.Text`
  font-size: 18px;
  color: black;
`

export default function Modal() {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
      }}
    >
      <CenterdView>
        <ModalView>
          <Header>
            <ModalTitle>{activeRecipe?.Name}</ModalTitle>
            <CloseButton
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <CloseText>X</CloseText>
            </CloseButton>
          </Header>

          <Picture
            source={{
              uri: activeRecipe?.Image,
            }}
          />
          <ScrollView horizontal={false}>
            <Content>
              <ModalText>{activeRecipe?.Ingredients.split(',')}</ModalText>
            </Content>
            <Recipe>
              <ModalText>{activeRecipe?.Instruction}</ModalText>
            </Recipe>
          </ScrollView>
        </ModalView>
      </CenterdView>
    </Modal>
  )
}
