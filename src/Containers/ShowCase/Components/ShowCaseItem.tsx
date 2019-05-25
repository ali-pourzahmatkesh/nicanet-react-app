import React from 'react';
import styled from 'styled-components';
import { Title } from './Styled';

const Container = styled.div<{ theme?: any }>`
  margin: 1.8rem 0;
  padding-bottom: ${props => (props.theme.hasLine ? '1.8rem' : '0')};
  border-bottom-color: ${props => (props.theme.hasLine ? '#bdbdbd' : '#fff')};
  border-bottom-width: ${props => (props.theme.hasLine ? '1px' : '0')};
  border-bottom-style: solid;
  @media (min-width: 700px) {
    margin: 1rem 0;
    padding-bottom: ${props => (props.theme.noLine ? '0' : '1rem')};
    border-bottom-color: ${props => (props.theme.noLine ? '#fff' : '#bdbdbd')};
    border-bottom-width: ${props => (props.theme.noLine ? '0' : '1px')};
  }
`;

interface ShowCaseItem {
  title?: string;
  theme?: any;
}

const ShowCaseItem: React.FC<ShowCaseItem> = props => {
  return (
    <Container theme={props.theme}>
      {props.title && <Title>{props.title}</Title>}
      {props.children}
    </Container>
  );
};

export default ShowCaseItem;
