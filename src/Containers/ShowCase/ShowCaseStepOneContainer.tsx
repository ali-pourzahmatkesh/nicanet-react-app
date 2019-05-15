import React from "react";
import styled from "styled-components";
import Layout from "components/Partials/Layout";
import { RouteComponentProps } from "react-router";
import { HOME_ROUTE } from "router/RouterConstants";
import Heading from "./Components/Heading";
import ShowCaseStepOne from "./Content/ShowCaseStepOne";
import CloseIcon from "Assets/Close.svg";

const Container = styled.div`
  padding: 0 1rem;
`;

interface ShowCaseStepOneContainerProps {
  caseId: string;
}
const ShowCaseStepOneContainer: React.FC<
  RouteComponentProps<ShowCaseStepOneContainerProps>
> = props => {
  const { caseId } = props.match.params;

  const goForward = () => {
    props.history.push(HOME_ROUTE);
  };

  const goBackward = () => {
    props.history.push(HOME_ROUTE);
  };

  return (
    <Layout noPadding>
      <Heading
        title="Case Report"
        onGoBack={goBackward}
        onGoForward={goForward}
        LeftIconSvg={CloseIcon}
      />
      <Container>
        <ShowCaseStepOne caseId={caseId} />
      </Container>
    </Layout>
  );
};

export default ShowCaseStepOneContainer;
