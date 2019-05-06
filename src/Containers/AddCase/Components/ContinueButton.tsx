import React from 'react'
import styled from 'styled-components';
import { PulseLoader } from 'react-spinners';

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
  isLoading?: boolean
  onClick: () => void
}

const ContinueButton: React.FC<ContinueButtonProps> = (props) => {
  const { title, onClick, isLoading } = props

  return (
    <Button onClick={onClick}>
      {
        isLoading ?
        <PulseLoader
          sizeUnit="rem"
          size={0.5}
          color="#fff"
        /> : title
      }
    </Button>
  )
}

ContinueButton.defaultProps = {
  title: 'Continue'
}

export default ContinueButton
