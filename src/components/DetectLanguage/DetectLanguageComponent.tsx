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
    var ltrChars =
        'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF' +
        '\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
      rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
      rtlDirCheck = new RegExp('^[^' + ltrChars + ']*[' + rtlChars + ']');

    return rtlDirCheck.test(text);
  };

  return <Content isRTL={detect(value)}>{children}</Content>;
};

export default DetectLanguage;
