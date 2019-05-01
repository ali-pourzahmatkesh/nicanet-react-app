import styled from 'styled-components'

import { DARK } from '../../constants/colors'

export const AppBadge = styled.a`
  background-color: ${DARK};
  border-radius: 12px;
  padding: 0.5rem 1rem;
  width: 9rem;
  height: 2.5rem;
  position: relative;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
`

const generateCustomBadge = (title, icon) => {
  return styled(AppBadge).attrs({ title })`
    ::before {
      content: '';
      position: relative;
      display: block;
      background: url(${icon}) no-repeat;
      width: 1rem;
      height: 1rem;
      margin-right: 0.5rem;
      background-size: contain;
    }
    ::after {
      content: '${title}';
      position: relative;
      display: block;
    }
  `
}

export const SibAppBadge = generateCustomBadge(
  'Sib App',
  '/static/icons/sibapp.png'
)

export const DirectLinkBadge = generateCustomBadge(
  'Direct Link',
  '/static/icons/apple.png'
)

export const GooglePlayBadge = generateCustomBadge(
  'Google Play',
  '/static/icons/googleplay.png'
)

export const CafeBazaarBadge = generateCustomBadge(
  'Cafe Bazaar',
  '/static/icons/cafebazaar.png'
)
