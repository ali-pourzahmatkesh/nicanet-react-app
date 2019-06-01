import React from 'react';
import styled from 'styled-components';
import { PulseLoader } from 'react-spinners';
import ActionButton from '../../components/ActionButton';

const Button = styled(ActionButton).attrs({ fullWidth: true })`
  margin-top: 1rem;
  cursor: pointer;
`;

type ContinueButtonProps = {
  title?: string;
  isLoading?: boolean;
  onClick: (e: any) => void;
};

const ContinueButton: React.FC<ContinueButtonProps> = props => {
  const { title, onClick, isLoading } = props;

  return (
    <Button onClick={e => onClick(e)}>
      {isLoading ? (
        <PulseLoader sizeUnit="rem" size={0.5} color="#fff" />
      ) : (
        title
      )}
    </Button>
  );
};

ContinueButton.defaultProps = {
  title: 'Continue'
};

export default ContinueButton;
