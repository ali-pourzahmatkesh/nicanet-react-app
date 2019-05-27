import styled from 'styled-components';

import ActionButton from '../../components/ActionButton';
import { GRADIENT_START, GRADIENT_END } from '../../constants/colors';
import { AppBadge } from '../../components/Badges';

export const Container = styled.div`
  @media (min-width: 440px) {
    height: 100vh;
    overflow: hidden;
  }
`;

export const LogoImage = styled.img`
  height: auto;
  max-width: 100%;
  display: block;
  margin: 0 auto 1.5rem;
  @media (min-width: 440px) {
    margin: 0 auto 2rem;
  }
`;

export const GradientSectionContainer = styled.div`
  height: 42rem;
  padding: 0 1rem;
  height: 60vh;
  background-image: linear-gradient(64deg, ${GRADIENT_START}, ${GRADIENT_END});
  @media (min-width: 960px) {
    height: 70vh;
  }
  @media (min-width: 1440px) {
    height: 57vh;
  }
`;

export const TopSectionContainer = styled.div`
  padding: 2rem 0 0;
`;

export const MiddleSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 2rem;
  margin: 0 auto;
  @media (min-width: 960px) {
    flex-direction: row;
    padding: 0 4rem 2rem;
    max-width: 980px;
  }
`;

export const SiteTitle = styled.h1`
  font-family: Roboto;
  font-weight: bold;
  text-align: center;
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1rem;
  @media (min-width: 440px) {
    font-size: 2.5rem;
  }
`;

export const SiteSlogan = styled.h2`
  font-family: Roboto;
  text-align: center;
  color: #fff;
  font-size: 0.85rem;
  margin: 0 auto 0.5rem;
  @media (min-width: 440px) {
    width: 400px;
    margin: 0 auto 2rem;
  }
`;

export const MockupImageWrapper = styled.div`
  display: none;
  @media (min-width: 960px) {
    flex: 0.55;
    text-align: center;
    padding: 2rem 0 0;
    display: block;
  }
`;

export const MockupImage = styled.img`
  @media (min-width: 960px) {
    margin: 0 auto;
    height: auto;
    max-width: 100%;
  }
`;

export const FormWrapper = styled.div`
  flex: 1;
  @media (min-width: 440px) {
    padding: 0 2rem;
  }
  @media (min-width: 960px) {
    flex: 0.45;
    padding: 0;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 2px 7.5px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  margin: 1rem auto;
  min-height: 345px;
  @media (min-width: 400px) {
    min-width: 385px;
  }
  @media (min-width: 440px) {
    padding: 2rem;
    max-width: 90%;
  }
  @media (min-width: 960px) {
    margin: 1rem 0 0 3rem;
    max-width: 100%;
  }
`;

export const FormTitle = styled.p`
  margin-bottom: 1rem;
  margin-top: 0;
  @media (min-width: 440px) {
    margin-bottom: 2rem;
  }
`;

export const LoginButton = styled(ActionButton).attrs({ fullWidth: true })`
  margin-top: 1rem;
`;

export const BottomSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem 0;
  align-items: center;
`;

export const AppBadgesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  ${AppBadge} {
    margin: 1rem;
  }
`;

export const RegisterText = styled.div`
  font-size: 1rem;
  color: #424242;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`;

export const RegisterLink = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #369eb3;
  flex: 0.4;
  text-align: right;
  @media (min-width: 440px) {
    flex: 0.3;
  }
`;

export const Text = styled.div`
  flex: 0.6;
  @media (min-width: 440px) {
    flex: 0.7;
  }
`;
