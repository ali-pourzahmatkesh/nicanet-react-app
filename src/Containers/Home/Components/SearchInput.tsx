import React from 'react'
import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';

const Input = styled.input`
  border-radius: 12px;
  border: solid 1px #757575;
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0.5rem;
  outline: 0;
  font-size: 1rem;
`

const Container = styled.div`
  position: relative;
`

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0.6rem;
  right: 0.7rem;
`

interface SearchInputProps {
  isLoading: boolean
  onChangeText: (text: string) => void
}

function SearchInput(props: SearchInputProps) {
  const { onChangeText, isLoading } = props

  return (
    <Container>
      <Input placeholder="Search users..." onChange={e => onChangeText(e.target.value)} />
      <LoadingWrapper>
        <BounceLoader
          sizeUnit="rem"
          size={1}
          color="#5498a9"
          loading={isLoading}
        />
      </LoadingWrapper>
    </Container>
  )
}

export default SearchInput
