import React from 'react'
import styled from 'styled-components';

const Button = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
  background-color: #5498a9;
  color: #fff;
  border-radius: 0.5rem;
`

type ContinueButtonProps = {
  title?: string
  onClick: () => void
}

const ContinueButton: React.FC<ContinueButtonProps> = (props) => {
  const { title, onClick } = props

  return (
    <Button onClick={onClick}>
      {title}
    </Button>
  )
}

ContinueButton.defaultProps = {
  title: 'Continue'
}

export default ContinueButton
