import React from 'react';
import styled from 'styled-components';

const Content = styled.div<{ isRTL?: boolean }>`
  text-align: ${props => (props.isRTL ? 'right' : 'left')};
  direction: ${props => (props.isRTL ? 'rtl' : 'ltr')};
`;

type DetectLanguageProps = {
  value: string;
};

const DetectLanguage: React.FC<DetectLanguageProps> = props => {
  const { value, children } = props;
  const detect = (text: string) => {
    const rtlChars =
        '\u0591-\u07FF\u200F\u202B\u202E\uFB1D-\uFDFD\uFE70-\uFEFC',
      rtlDirCheck = new RegExp('^[^' + rtlChars + ']*?[' + rtlChars + ']');

    return rtlDirCheck.test(text);
  };

  return <Content isRTL={detect(value)}>{children}</Content>;
};

export default DetectLanguage;
