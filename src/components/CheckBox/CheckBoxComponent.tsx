import React from 'react'
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  margin: 1.5rem 0;
  align-items: center;
`

const OptionCircleChecked = css`
  background-color: #5498a9;
`

const OptionCircleWrapper = styled.div`
  border: 1px solid #555;
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 0.2rem;
  margin-right: 0.3rem;
  display: flex;
  align-items: center;
  padding: 1px;
`

const OptionCircle = styled.div<{ isChecked?: boolean  }>`
  border: 2px solid #fff;
  border-radius: 0.2rem;
  background-color: #fff;
  height: 1rem;
  width: 1rem;

  ${ props => props.isChecked && OptionCircleChecked }
`

const OptionLabel = styled.div`
  font-family: Roboto;
  font-size: 0.8rem;
  font-weight: bold;
  color: #424242;
  margin-right: 0.3rem;
`

type CheckBoxProps = {
  value?: any
  onChange?: (value: any | undefined) => void
  name: string
}

class CheckBox extends React.Component<CheckBoxProps> {
  render () { 
    const { name, value, onChange } = this.props

    const onClick = (optionValue: any) => {
      if (!onChange) return

      if (value) onChange(undefined)
      else onChange(true)
    }

    return (
      <Container onClick={onClick}>
        <OptionCircleWrapper>
          <OptionCircle isChecked={value} />
        </OptionCircleWrapper>
        <OptionLabel>{name}</OptionLabel>
      </Container>
    )
  }
}

export default CheckBox
