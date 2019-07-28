import React from 'react';
import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';

const Input = styled.input`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0.5rem;
  outline: 0;
  font-size: 0.8rem;
  border: 0;
  border-radius: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  border: solid 1px #ddd;
  padding: 2px 15px;
  width: 100%;
  @media (min-width: 720px) {
    width: auto;
  }
`;

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0.6rem;
  right: 0.7rem;
`;

const Label = styled.div`
  display: none;
  @media (min-width: 720px) {
    display: block;
    font-size: 0.9rem;
    margin-right: 20px;
  }
`;

interface SearchInputProps {
  isLoading: boolean;
  onChangeText: (text: string) => void;
}

function SearchInput(props: SearchInputProps) {
  const { onChangeText, isLoading } = props;

  return (
    <Wrapper>
      <Label>Looking for a Course?</Label>
      <Container>
        <IoIosSearch color={'#777'} size={20} />
        <Input
          placeholder="Search CME Courses"
          onChange={e => onChangeText(e.target.value)}
        />
        <LoadingWrapper>
          <BounceLoader
            sizeUnit="rem"
            size={1}
            color="#5498a9"
            loading={isLoading}
          />
        </LoadingWrapper>
      </Container>
    </Wrapper>
  );
}

export default SearchInput;
