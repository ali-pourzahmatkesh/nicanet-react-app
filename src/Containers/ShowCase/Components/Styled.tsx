import styled from 'styled-components';

export const Title = styled.div<{ primary?: boolean }>`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: ${props => (props.primary ? '#5498a9' : '#212121')};
  margin-bottom: 1rem;
`;

export const Value = styled.div<{ noIndent?: boolean }>`
  font-family: Roboto;
  font-size: 0.8rem;
  color: #212121;
  margin-top: 0.5rem;
  @media (min-width: 700px) {
    padding: ${props => (props.noIndent ? '0' : '0 2rem')};
  }
`;

export const StringValue = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  color: #212121;
  margin-bottom: 1rem;
  @media (min-width: 700px) {
    padding: 0 2rem;
  }
`;

export const PaddedWrapper = styled.div`
  padding: 1rem 1.5rem 0.5rem;
  @media (min-width: 700px) {
    padding: 1rem 0 3rem;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  @media (min-width: 700px) {
    padding: 0 3.2rem;
  }
`;

export const Col = styled.div<{ color?: string }>`
  font-family: Roboto;
  font-size: 0.9rem;
  color: ${props => props.color || '#212121'};
  margin-bottom: 1rem;
`;

export const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const Wrapper = styled.div`
  padding: 0 1rem;
  @media (min-width: 700px) {
    padding: 0;
  }
`;
