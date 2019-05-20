import React from "react";
import styled from "styled-components";
import { Title } from "./Styled";

const Container = styled.div<{ noLine?: boolean }>`
  margin: 1.8rem 0;
  padding-bottom: ${props => (props.noLine ? "0" : "1.8rem")};
  border-bottom-color: ${props => (props.noLine ? "#fff" : "#bdbdbd")};
  border-bottom-width: ${props => (props.noLine ? "0" : "1px")};
  border-bottom-style: solid;
`;

interface ShowCaseItem {
  title?: string;
  noLine?: boolean;
}

const ShowCaseItem: React.FC<ShowCaseItem> = props => {
  return (
    <Container noLine={props.noLine || false}>
      {props.title && <Title>{props.title}</Title>}
      {props.children}
    </Container>
  );
};

export default ShowCaseItem;
