import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  margin: 1.8rem 0;
`

interface AdrFormItem {

}

const AdrFormItem: React.FC<AdrFormItem> = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default AdrFormItem
