import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;
  position: relative;

  .select-css {
    outline: 0;
    display: block;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: 0.6em 1.4em 0.5em 0.8em;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #aaa;

    background: #fff;
    padding: 3px 22px 3px 3px;
    background-image: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M7.406 7.828l4.594 4.594 4.594-4.594 1.406 1.406-6 6-6-6z'%3E%3C/path%3E%3C/svg%3E");
    background-position: calc(100% - 3px) 50%;
    background-repeat: no-repeat;
    background-size: 16px;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .select-css::-ms-expand {
    display: none;
  }

  .select-css:hover {
  }

  .select-css:focus {
    color: #222;
    outline: 0;
  }

  .select-css option {
    font-weight: normal;
  }
`;

const PlaceHolder = styled.div`
  position: absolute;
`;

export interface SelectOption {
  name: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  placeholder?: string;
  onChange?: (value: string | undefined) => void;
  value?: any;
  defaultValue?: string;
}

class Select extends React.Component<SelectProps> {
  static defaultProps = {
    options: []
  };

  render() {
    const { options, placeholder, onChange, value, defaultValue } = this.props;

    const handleChange = (event: any) => {
      if (!onChange) return;
      const value = event.target.value;
      if (value === 'Select_Default_Value') onChange(undefined);
      else onChange(value);
    };

    return (
      <Container>
        {!value && placeholder && <PlaceHolder>{placeholder}</PlaceHolder>}
        <select
          placeholder="Year of Birth"
          className="select-css"
          onChange={handleChange}
          // onClick={() => {
          //   console.log('defaultValue', defaultValue);
          //   if (!onChange) return;
          //   onChange(defaultValue);
          // }}
        >
          <option value="Select_Default_Value" />
          {options.length > 0 &&
            options.map(option => {
              return (
                <option
                  key={`${option.name}-${option.value}`}
                  value={option.value}
                  selected={option.value == value}
                >
                  {option.name}
                </option>
              );
            })}
        </select>
      </Container>
    );
  }
}

export default Select;
