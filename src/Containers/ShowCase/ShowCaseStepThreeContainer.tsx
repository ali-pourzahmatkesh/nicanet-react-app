import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { CaseApi } from 'Api/CaseApi';
import { NOT_FOUND_ROUTE } from '../../router/RouterConstants';
import Heading from './Components/Heading';
import MultiButton from 'components/MultiButton/MultiButton';
import ContinueButton from './Components/ContinueButton';
import ShowCaseStepThreeLabTest from './Content/ShowCaseStepThreeLabTest';
import ShowCaseStepThreeImaging from './Content/ShowCaseStepThreeImaging';
import { Wrapper } from './Components/Styled';

const Container = styled.div`
  padding: 2rem 0 0;
  margin: 0 -1rem;
  @media (min-width: 720px) {
    padding: 2rem 1rem 0;
    margin: 0;
  }
`;

const Content = styled.div`
  min-height: 12rem;
`;
const MultiButtonWrapper = styled.div`
  padding: 0 2rem;
  @media (min-width: 720px) {
    padding: 0 8rem 2rem;
  }
`;

interface ShowCaseStepThreeContainerProps {
  caseId: string;
}
const ShowCaseStepThreeContainer: React.FC<
  RouteComponentProps<ShowCaseStepThreeContainerProps>
> = props => {
  const { caseId } = props.match.params;
  const [activeTabName, setActiveTabName] = useState('Lab Test');
  const [caseInfo, setCaseInfo] = useState(null);
  const [examinationArray, setExaminationArray] = useState<any[]>([]);
  const [caseExaminations, setCaseExaminations] = useState<any[]>([]);

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await CaseApi.getCase(caseId, false);
        if (response.status !== 200) return;
        setCaseInfo(response.data);
        setCaseExaminations(response.data.Examinations);
      } catch (err) {
        console.log('error in get case: ', err);
        props.history.push(NOT_FOUND_ROUTE);
      }
    };
    effect();
  }, [caseId, props.history]);

  useEffect(() => {
    const effect = async () => {
      const response = await CaseApi.getExaminationByCaseId(caseId);
      console.log('response', response);
      if (response.status !== 200) return;
      setExaminationArray(response.data);
    };
    effect();
  }, [caseId]);

  const goToStepFour = () => {
    props.history.push(`/show-case-step-four/${caseId}`);
  };

  const goToStepTwo = () => {
    props.history.push(`/show-case-step-two/${caseId}`);
  };

  return (
    <Layout noHeader>
      <Heading
        title="Case Report"
        onGoBack={goToStepTwo}
        onGoForward={goToStepFour}
      />
      <Container>
        <MultiButtonWrapper>
          <MultiButton
            activeItemName={activeTabName}
            items={[
              { name: 'Lab Test', onClick: () => setActiveTabName('Lab Test') },
              { name: 'Imaging', onClick: () => setActiveTabName('Imaging') }
            ]}
          />
        </MultiButtonWrapper>
        <Content>
          {activeTabName === 'Lab Test' && (
            <ShowCaseStepThreeLabTest
              caseInfo={caseInfo}
              examinationArray={examinationArray}
              caseExaminations={caseExaminations}
            />
          )}
          {activeTabName === 'Imaging' && (
            <ShowCaseStepThreeImaging caseInfo={caseInfo} />
          )}
        </Content>
        {caseInfo !== null && (
          <Wrapper>
            <ContinueButton onClick={goToStepFour} />
          </Wrapper>
        )}
      </Container>
    </Layout>
  );
};

export default ShowCaseStepThreeContainer;
