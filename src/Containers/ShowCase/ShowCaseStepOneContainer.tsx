import React from 'react';
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { HOME_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import ShowCaseStepOne from './Content/ShowCaseStepOne';

const Container = styled.div`
  padding: 0;
`;

interface ShowCaseStepOneContainerProps {
  caseId: string;
}
const ShowCaseStepOneContainer: React.FC<
  RouteComponentProps<ShowCaseStepOneContainerProps>
> = props => {
  const { caseId } = props.match.params;

  const goForward = () => {
    props.history.push(`/show-case-step-two/${caseId}`);
  };

  const goBackward = () => {
    props.history.push(HOME_ROUTE);
  };

  return (
    <Layout>
      <Heading
        title="Case Report"
        onGoBack={goBackward}
        onGoForward={goForward}
      />
      <Container>
        <ShowCaseStepOne caseId={caseId} onSubmit={goForward} />
      </Container>
    </Layout>
  );
};

export default ShowCaseStepOneContainer;
