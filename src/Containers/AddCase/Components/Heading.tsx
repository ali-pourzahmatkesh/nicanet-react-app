import React from 'react'
import styled from 'styled-components';

import LeftIcon from 'Assets/Left.svg'
import RightIcon from 'Assets/Right.svg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding-bottom: 1rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid #979797;
  position: relative;
`

const Title = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
  color: #000000;
`

const SubTitle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: #212121;
`

const NavIconBase = styled.img`
  width: 2rem;
  height: 2rem;
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`

const ForwardIcon = styled(NavIconBase)`
  right: 0;
`

const BackIcon = styled(NavIconBase)`
  left: 0;
`

type HeadingProps = {
  title: string
  subtitle: string
  onGoBack?: () => void
  onGoForward?: () => void
}

const Heading: React.FC<HeadingProps> = (props) => {
  const { title, subtitle, onGoForward, onGoBack } = props

  return (
    <Container>
      {
        onGoForward &&
        <ForwardIcon onClick={onGoForward} src={RightIcon} />
      }
      {
        onGoBack &&
        <BackIcon onClick={onGoBack} src={LeftIcon} />
      }
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </Container>
  )
}

export default Heading
