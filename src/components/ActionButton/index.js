import styled, { css } from 'styled-components'

import { PRIMARY, PRIMARY_LIGHT } from '../../constants/colors'

export default styled.button`
  border: none;
  outline: none;
  border-radius: 8px;
  background-color: ${PRIMARY};
  color: #ffffff;
  text-align: center;
  width: fit-content;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease-in;

  :hover {
    background-color: ${PRIMARY_LIGHT};
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `};
`
