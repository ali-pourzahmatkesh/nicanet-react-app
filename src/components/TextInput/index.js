import styled from 'styled-components'

import { PLACEHOLDER, BORDER, PRIMARY } from '../../constants/colors'

export default styled.input`
  border: none;
  outline: none;
  font-size: 1rem;
  transition: all 0.3s ease-in;
  border-bottom-color: ${BORDER};
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding: 0.5rem 0;
  margin: 0 0 2rem 0;

  ::placeholder {
    color: ${PLACEHOLDER};
  }

  :focus {
    border-bottom-color: ${PRIMARY};
  }
`
