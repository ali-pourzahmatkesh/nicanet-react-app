import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 1.8rem 0;
`;

interface ShowCaseItem {}

const ShowCaseItem: React.FC<ShowCaseItem> = props => {
  return <Container>{props.children}</Container>;
};

export default ShowCaseItem;
