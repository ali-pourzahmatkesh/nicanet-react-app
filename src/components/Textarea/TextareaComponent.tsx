import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTextarea = styled.textarea<React.HTMLProps<HTMLTextAreaElement>>`
  border: 0;
  border-bottom: 1px solid #aaa;
  padding: 0.6em 1.4em 0.5em 0.8em;
  display: flex;
  flex: 1;
  font-size: 0.7rem;
  outline: 0;
  padding: 0.5rem 0;
  // text-align: ${props => (props.value ? 'right' : 'left')};
  // direction: ${props => (props.value ? 'rtl' : 'ltr')};
`;

type TextareaProps = {
  value?: any;
  onChange?: (value: any | undefined) => void;
  placeholder: string;
};

class Textarea extends React.Component<TextareaProps> {
  render() {
    const { value, onChange, placeholder } = this.props;

    return (
      <Container>
        <StyledTextarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </Container>
    );
  }
}

export default Textarea;
