import React from 'react';
import styled from 'styled-components';
import { IoMdTrash } from 'react-icons/io';

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: #5498a9;
`;

const Subtitle = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  color: #212121;
  margin-top: 1rem;
`;

const Icon = styled.div`
  cursor: pointer;
`;

type DrugProps = {
  title: string;
  subtitle: string;
  onDelete?: () => void;
};

const Drug: React.FC<DrugProps> = props => {
  const { title, subtitle, onDelete } = props;

  return (
    <Container>
      <div>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>
      <Icon>
        <IoMdTrash color={'#bdbdbd'} size={22} onClick={onDelete} />
      </Icon>
    </Container>
  );
};

export default Drug;
