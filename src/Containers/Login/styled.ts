import styled from 'styled-components'

import ActionButton from '../../components/ActionButton'
import { GRADIENT_START, GRADIENT_END } from '../../constants/colors'
import { AppBadge } from '../../components/Badges'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const LogoImage = styled.img`
  height: 5rem;
  width: auto;
`

export const GradientSectionContainer = styled.div`
  height: 40rem;
  background-image: linear-gradient(64deg, ${GRADIENT_START}, ${GRADIENT_END});
`

export const TopSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 3.1rem 0 4rem;
`

export const MiddleSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 1rem;
  padding-bottom: 2rem;
`

export const MockupImage = styled.img`
  width: 100%;
  margin: 0 auto;
  height: 26rem;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 7.5px 0 rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
  width: 29rem;
  min-height: 29rem;
  margin-top: 1rem;
`

export const FormTitle = styled.p`
  margin-bottom: 3rem;
`

export const LoginButton = styled(ActionButton).attrs({ fullWidth: true })`
  margin-top: 2rem;
`

export const BottomSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem 0;
  align-items: center;
`

export const AppBadgesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  ${AppBadge} {
    margin: 1rem;
  }
`

export const RegisterText = styled.div`
  font-size: 1rem;
  color: #424242;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`

export const RegisterLink = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #369eb3;
`
