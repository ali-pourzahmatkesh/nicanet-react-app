import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex: 1;

  .select-css {
    outline: 0;
    display: block;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
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
    font-weight:normal;
  }
`

export interface SelectOption {
  name: string
  value: string
}

interface SelectProps {
  options: SelectOption[]
  placeholder: string
  onChange?: (value: string | undefined) => void
}

class Select extends React.Component<SelectProps> {
  static defaultProps = {
    options: []
  }

  render() {
    const { options, placeholder, onChange } = this.props
  
    const handleChange = (event: any) => {
      if (!onChange) return
      const value = event.target.value
      if (value === 'Select_Default_Value') onChange(undefined)
      else onChange(value)
    }
  
    return (
      <Container>
        <select placeholder="Year of Birth" className="select-css" onChange={handleChange}>
          <option value="Select_Default_Value">{placeholder}</option>
          {
            options.length > 0 && 
            options.map(option => <option key={`${option.name}-${option.value}`} value={option.value}>{option.name}</option>)
          }
        </select>
      </Container>
    )
  }
}

export default Select
