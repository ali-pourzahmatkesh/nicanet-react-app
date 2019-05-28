import React from 'react';
import styled from 'styled-components';

const StringValue = styled.div<{ size?: string }>`
  font-family: Roboto;
  font-size: ${props => props.size};
  color: #212121;
  margin-bottom: 1rem;
  @media (min-width: 720px) {
    padding: 0 2rem;
  }
`;

interface ShowCaseStringArray {
  stringArray: any[];
  title: string;
  valueSize?: string;
}

const ShowCaseStringArray: React.FC<ShowCaseStringArray> = props => {
  const { stringArray, title, valueSize } = props;
  if (stringArray.length === 0) return null;
  return (
    <StringValue size={valueSize || '1rem'}>
      {stringArray.map((item: any, index) => {
        return (
          <span key={index.toString()}>
            {item[title] !== '' ? (
              <span>
                {item[title]}
                {stringArray.length - 1 === index ? null : <span> - </span>}
              </span>
            ) : null}
          </span>
        );
      })}
    </StringValue>
  );
};

export default ShowCaseStringArray;
