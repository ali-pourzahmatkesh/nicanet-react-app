import React from 'react'
import styled, { css } from 'styled-components';

const Container = styled.div`
  border-radius: 1rem;
  border: solid 1px #5498a9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 2rem;
`

const StyledItemActiveStyle = css`
  color: #fff;
  background-color: #5498a9;
`

const StyledItem = styled.div<{ active?: boolean }>`
  display: flex;
  flex: 1;
  padding: 0.5rem 1rem;
  justify-content: center;
  ${props => props.active && StyledItemActiveStyle};
`

interface Item {
  name: string
  onClick: () => void
}

type MultiButtonProps = {
  items: Item[]
  activeItemName: string
}

const MultiButton: React.FC<MultiButtonProps> = (props) => {
  const { items, activeItemName } = props

  return (
    <Container>
      {
        items.map(item => <StyledItem active={item.name === activeItemName} onClick={item.onClick}>{item.name}</StyledItem>)
      }
    </Container>
  )
}

export default MultiButton
