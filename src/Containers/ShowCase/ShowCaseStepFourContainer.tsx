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
import { ContentApi } from '../../Api/ContentApi';
import { toast } from 'react-toastify';

const Container = styled.div`
  padding: 2rem 0 0;
  margin: 0 -1rem -1rem;
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
  const [contentId, setContentId] = useState(null);
  const [personVoted, setPersonVoted] = useState<boolean>(false);
  const [personVote, setPersonVote] = useState<boolean>(false);

  useEffect(() => {
    const effect = async () => {
      const response = await CaseApi.getCase(caseId, false);
      if (response.status !== 200) return;
      const CaseInfo = response.data;
      console.log('CaseInfo', CaseInfo);
      setCaseInfo(CaseInfo);
      setContentId(CaseInfo.ContentId);
      setPersonVoted(CaseInfo.PersonVoted);
      setPersonVote(CaseInfo.PersonVote);
    };
    effect();
  }, [caseId]);

  const updateCase = async () => {
    try {
      const response = await CaseApi.getCase(caseId, false);
      if (response.status !== 200) return;
      const CaseInfo = response.data;
      setCaseInfo(CaseInfo);
      setContentId(CaseInfo.ContentId);
      setPersonVoted(CaseInfo.PersonVoted);
      setPersonVote(CaseInfo.PersonVote);
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
      // false: first we delete like/dislike
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
    }
  };

  const removeContentLikeOrDislike = async () => {
    try {
      await ContentApi.removeLikeOrDislike(contentId, 0);
    } catch (err) {}
  };

  const onContentLike = async (isLike: boolean) => {
    try {
      // false: first we delete like/dislike
      await removeContentLikeOrDislike();

      if (
        personVoted === true &&
        ((isLike && personVote === true) || (!isLike && personVote === false))
      ) {
        return;
      }

      // true: then we like or dislike
      await ContentApi.likeContent(contentId, 0, isLike);

      toast.success(`Case ${isLike ? 'liked' : 'disliked'}`, {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (err) {
      toast.error(`Failed to ${isLike ? 'like' : 'dislike'}`, {
        position: toast.POSITION.TOP_CENTER
      });
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
              onContentLike={(isLike: boolean) => onContentLike(isLike)}
              updateCase={() => updateCase()}
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
              onContentLike={(isLike: boolean) => onContentLike(isLike)}
              updateCase={() => updateCase()}
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
