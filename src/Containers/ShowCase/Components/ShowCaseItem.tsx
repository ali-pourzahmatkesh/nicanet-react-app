import React from "react";
import styled from "styled-components";
import { Title } from "./Styled";

const Container = styled.div<{ hasLine?: boolean; verticalMargin?: any }>`
  margin: ${props => props.verticalMargin} 0;
  padding-bottom: ${props => (props.hasLine ? "1.8rem" : "0")};
  border-bottom-color: ${props => props.hasLine && "#bdbdbd"};
  border-bottom-width: ${props => props.hasLine && "1px"};
  border-bottom-style: ${props => props.hasLine && "solid"};
`;

interface ShowCaseItem {
  title?: string;
  hasLine?: boolean;
  verticalMargin?: any;
}

const ShowCaseItem: React.FC<ShowCaseItem> = props => {
  return (
    <Container
      hasLine={props.hasLine || false}
      verticalMargin={props.verticalMargin || "1.8rem"}
    >
      {props.title && <Title>{props.title}</Title>}
      {props.children}
    </Container>
  );
};

export default ShowCaseItem;
