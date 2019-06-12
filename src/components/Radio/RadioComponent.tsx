import React from 'react';
import styled, { css } from 'styled-components';
import isEqual from 'lodash.isequal';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: #212121;
  flex: 1;
`;

const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  max-width: 180px;
`;

const Option: any = styled.div`
  display: flex;
  align-items: center;
`;

const OptionCircleChecked = css`
  background-color: #5498a9;
`;

const OptionCircleWrapper = styled.div`
  border: 1px solid #555;
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 1.2rem;
  margin-right: 0.3rem;
  display: flex;
  align-items: center;
  padding: 1px;
`;

const OptionCircle = styled.div<{ isChecked?: boolean }>`
  border: 2px solid #fff;
  border-radius: 1rem;
  background-color: #fff;
  height: 1rem;
  width: 1rem;

  ${props => props.isChecked && OptionCircleChecked};
`;

const OptionLabel = styled.div`
  font-family: Roboto;
  font-size: 0.8rem;
  font-weight: bold;
  color: #424242;
  margin-right: 0.3rem;
`;

export const RadioComponents = {
  Label,
  OptionsWrapper,
  Option,
  OptionCircleWrapper,
  OptionCircle,
  OptionLabel
};

interface RadioOption {
  name: string;
  value: any;
}

type RadioProps = {
  value?: any;
  onChange?: (value: any | undefined) => void;
  label: string;
  options: RadioOption[];
};

class Radio extends React.Component<RadioProps> {
  render() {
    const { label, options, value, onChange } = this.props;

    const onSelectOption = (optionValue: any) => {
      if (!onChange) return;

      if (isEqual(optionValue, value)) onChange(undefined);
      else onChange(optionValue);
    };

    return (
      <Container>
        <Label>{label}</Label>
        <OptionsWrapper>
          {options.map(option => {
            return (
              <Option
                key={option.name}
                onClick={() => onSelectOption(option.value)}
              >
                <OptionCircleWrapper>
                  <OptionCircle isChecked={isEqual(option.value, value)} />
                </OptionCircleWrapper>
                <OptionLabel>{option.name}</OptionLabel>
              </Option>
            );
          })}
        </OptionsWrapper>
      </Container>
    );
  }
}

export default Radio;
