import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { CaseApi } from 'Api/CaseApi';
import Heading from './Components/Heading';
import { HOME_ROUTE } from 'router/RouterConstants';
import MultiButton from 'components/MultiButton/MultiButton';
import ShowCaseStepFourDX from './Content/ShowCaseStepFourDX';
import ShowCaseStepFourRX from './Content/ShowCaseStepFourRX';

const Container = styled.div`
  padding: 2rem 0 0;
  margin: 0 -1rem;
  @media (min-width: 700px) {
    padding: 2rem 1rem 0;
    margin: 0;
  }
`;

const Content = styled.div`
  min-height: 12rem;
`;
const MultiButtonWrapper = styled.div`
  padding: 0 2rem;
  @media (min-width: 700px) {
    padding: 0 10rem 2rem;
  }
`;

interface ShowCaseStepFourContainerProps {
  caseId: string;
}
const ShowCaseStepFourContainer: React.FC<
  RouteComponentProps<ShowCaseStepFourContainerProps>
> = props => {
  const { caseId } = props.match.params;
  const [activeTabName, setActiveTabName] = useState('DX');
  const [caseInfo, setCaseInfo] = useState(null);

  useEffect(() => {
    const effect = async () => {
      const response = await CaseApi.getCase(caseId, false);
      if (response.status !== 200) return;
      setCaseInfo(response.data);
    };
    effect();
  }, [caseId]);

  const updateCase = async () => {
    try {
      const response = await CaseApi.getCase(caseId, false);
      if (response.status !== 200) return;
      setCaseInfo(response.data);
    } catch (err) {}
  };

  const removeLikeOrDislike = async (type: string, paramsValue: string) => {
    try {
      let params = {};
      if (type === 'DX') {
        params = {
          DiagnosisId: paramsValue
        };
        await CaseApi.removeDXLikeOrDislike(params);
      }

      if (type === 'RX') {
        params = {
          PrescriptionDrugId: paramsValue
        };
        await CaseApi.removeRXLikeOrDislike(params);
      }
    } catch (err) {}
  };

  const onLike = async (
    type: string,
    paramsValue: string,
    voted: boolean,
    isLike: boolean
  ) => {
    try {
      // 0: first we delete like/dislike
      if (voted) {
        await removeLikeOrDislike(type, paramsValue);
      } else {
        if (type === 'DX') {
          const params = {
            IsLike: isLike ? 1 : 0,
            DiagnosisId: paramsValue
          };
          await CaseApi.likeDX(params);
        }

        if (type === 'RX') {
          const params = {
            IsLike: isLike ? 1 : 0,
            PrescriptionDrugId: paramsValue
          };
          await CaseApi.likeRX(params);
        }
      }
    } catch (err) {
      console.log('voted has error');
    } finally {
      updateCase();
    }
  };

  const goToHome = () => {
    props.history.push(HOME_ROUTE);
  };

  const goToStepThree = () => {
    props.history.push(`/show-case-step-three/${caseId}`);
  };

  return (
    <Layout>
      <Heading
        title="Case Report"
        onGoBack={goToStepThree}
        onGoForward={goToHome}
      />
      <Container>
        <MultiButtonWrapper>
          <MultiButton
            activeItemName={activeTabName}
            items={[
              { name: 'DX', onClick: () => setActiveTabName('DX') },
              { name: 'RX', onClick: () => setActiveTabName('RX') }
            ]}
          />
        </MultiButtonWrapper>
        <Content>
          {activeTabName === 'DX' && (
            <ShowCaseStepFourDX
              caseInfo={caseInfo}
              onLike={(
                type: string,
                paramsValue: string,
                voted: boolean,
                isLike: boolean
              ) => onLike(type, paramsValue, voted, isLike)}
            />
          )}
          {activeTabName === 'RX' && (
            <ShowCaseStepFourRX
              caseInfo={caseInfo}
              onLike={(
                type: string,
                paramsValue: string,
                voted: boolean,
                isLike: boolean
              ) => onLike(type, paramsValue, voted, isLike)}
            />
          )}
        </Content>
      </Container>
    </Layout>
  );
};

export default ShowCaseStepFourContainer;
