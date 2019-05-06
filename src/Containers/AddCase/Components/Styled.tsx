import styled from 'styled-components';

export const Title = styled.div<{ primary?: boolean }>`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: ${props => props.primary ? '#5498a9' : '#212121'};
`

export const PaddedWrapper = styled.div`
  padding: 0 2rem;
`

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: -1rem;
`

export const FromCol = styled.div`
  padding: 1rem;
  display: flex;
  flex: 1;
`