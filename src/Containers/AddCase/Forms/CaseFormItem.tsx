import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  margin: 1.8rem 0;
`

interface CaseFormItem {

}

const CaseFormItem: React.FC<CaseFormItem> = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default CaseFormItem
