import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  padding: 1rem;
  margin: 1rem 0;
`;

const Title = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: #5498a9;
  margin-bottom: 1rem;
`;

const Subtitle = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  color: #212121;
`;

type DrugProps = {
  title: string;
  subtitle: string;
};

const Drug: React.FC<DrugProps> = props => {
  const { title, subtitle } = props;

  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};

export default Drug;
