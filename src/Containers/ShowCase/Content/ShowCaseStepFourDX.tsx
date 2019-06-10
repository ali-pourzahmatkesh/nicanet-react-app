import React, { useState, useEffect } from 'react';
import { LoadingWrapprer } from '../Components/Styled';
import { BounceLoader } from 'react-spinners';
import Layout from '../../../components/Partials/Layout';
import styled from 'styled-components';
import DXRXItem from '../Components/DXRXItem';
import ContentActions from '../../../components/ContentActions/ContentActionsComponent';
import ContentStatusBar from '../../../components/ContentStatusBar/ContentStatusBarComponent';
import Comments from '../../../components/Comments/CommentsComponent';

const Interactions = styled.div`
  margin-top: 1rem;
`;

const Wrapper = styled.div`
  padding: 0 1rem;
  @media (min-width: 720px) {
    padding: 1rem 7rem;
  }
`;

const ContentActionsWrapper = styled.div`
  margin-top: 5rem;
  @media (min-width: 720px) {
    padding: 0 3.2rem;
  }
`;

const Drugs = styled.div`
  min-height: calc(100vh - 476px);
  @media (min-width: 720px) {
    min-height: calc(100vh - 623px);
  }
`;

interface ShowCaseStepFourDXProps {
  caseInfo: any;
  onContentLike: (isLike: boolean) => void;
  updateCase: () => void;
  onLike: (
    type: string,
    paramsValue: string,
    voted: boolean,
    isLike: boolean
  ) => void;
}

function ShowCaseStepFourDX(props: ShowCaseStepFourDXProps) {
  const { caseInfo, onLike, onContentLike, updateCase } = props;
  const [diagnosis, setDiagnosis] = useState<any[]>([]);

  useEffect(() => {
    const effect = async () => {
      if (!caseInfo) return;
      setDiagnosis(caseInfo.Diagnosis);
    };

    effect();
  }, [caseInfo]);

  if (caseInfo === null)
    return (
      <LoadingWrapprer>
        <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
      </LoadingWrapprer>
    );

  return (
    <div>
      <Wrapper>
        <Drugs>
          {diagnosis.length > 0 &&
            diagnosis.map(dr => {
              const id = dr.DiagnosisId;
              return (
                <div key={id}>
                  <DXRXItem
                    item={dr}
                    onLike={voted => onLike('DX', id, voted, true)}
                    onDisLike={voted => onLike('DX', id, voted, false)}
                  />
                </div>
              );
            })}
        </Drugs>
        <ContentActionsWrapper>
          <ContentActions
            content={caseInfo}
            onLike={() => onContentLike(true)}
            onDisLike={() => onContentLike(false)}
          />
        </ContentActionsWrapper>
      </Wrapper>
      <Interactions>
        <ContentStatusBar
          content={caseInfo}
          commentCount={caseInfo.DxCommentCount || 0}
        />
        <Comments
          comments={caseInfo.DxComment || []}
          content={caseInfo}
          source="DX"
          updateContent={() => updateCase()}
        />
      </Interactions>
    </div>
  );
}

export default ShowCaseStepFourDX;
