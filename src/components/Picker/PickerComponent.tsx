import React from 'react'
import styled from 'styled-components';


interface PickerProps {
  title: string
  iconSource: string
  onClick: () => void
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px dashed #979797;
  border-radius: 0.5rem;
`

const Icon = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
`

const Title = styled.div`
  font-family: Roboto;
  font-size: 0.8rem;
  font-weight: bold;
  color: #757575;
`

const Picker: React.FC<PickerProps> = (props) => {
  const { title, iconSource, onClick } = props

  return (
    <Container onClick={onClick}>
      <Icon src={iconSource} />
      <Title>{title}</Title>
    </Container>
  )
}

export default Picker
