import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled.input<React.HTMLProps<HTMLInputElement>>`
  border: 0;
  border-bottom: 1px solid #aaa;
  padding: 0.6em 1.4em 0.5em 0.8em;
  display: flex;
  flex: 1;
  font-size: 1rem;
  outline: 0;
  padding: 0.5rem 0;
`;

type InputProps = {
  value?: any;
  onChange?: (value: any | undefined) => void;
  placeholder: string;
  type?: any;
};

class Input extends React.Component<InputProps> {
  render() {
    const { value, onChange, placeholder, type } = this.props;

    return (
      <Container>
        <StyledInput
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
        />
      </Container>
    );
  }
}

export default Input;
