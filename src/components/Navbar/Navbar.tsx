import React from 'react'
import styled from 'styled-components';

import NavBarAdd from '../../Assets/NavBarAdd.svg'
import { ADD_POST_ROUTE, ADD_ADR_STEP_ZERO_ROUTE } from 'router/RouterConstants';

const Container = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: solid 1px #979797;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3);
  align-items: center;
  border-radius: 5px;
  @media (min-width: 480px) {
    padding: 0.8rem 1.5rem;
  }
`

const Col = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const AddIcon = styled.img`
  width: 24px;
  height: 24px;
`

const NavBarText = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: #424242;
  cursor: pointer;
`

const NavBarTextStart = styled(NavBarText)`
  cursor: default;
  margin-left: 1rem;
  @media (max-width: 480px) {
    display: none;
  }
`

const CenterNavBarText = styled(NavBarText)`
  border-right: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
  padding: 0 0.5rem;
  margin: 0 0.5rem;
`;

interface NavbarProps {
  onSelectRoute: (route: string) => void
}

function Navbar(props: NavbarProps) {
  const { onSelectRoute } = props

  return (
    <Container>
      <Wrapper>
        <Col>
          <AddIcon src={NavBarAdd} />
          <NavBarTextStart>Start a new:</NavBarTextStart>
        </Col>
        <Col>
          <NavBarText onClick={() => onSelectRoute(ADD_POST_ROUTE)}>Post</NavBarText>
          <CenterNavBarText onClick={() => onSelectRoute('/add-case-step-zero')}>Case Report</CenterNavBarText>
          <NavBarText onClick={() => onSelectRoute(ADD_ADR_STEP_ZERO_ROUTE)}>ADR Report</NavBarText>
        </Col>
      </Wrapper>
    </Container>
  )
}

export default Navbar
