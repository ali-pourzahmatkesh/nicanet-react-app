import React, { useState, useEffect } from 'react';
import { LoadingWrapprer } from '../Components/Styled';
import { BounceLoader } from 'react-spinners';
import Layout from '../../../components/Partials/Layout';
import styled from 'styled-components';
import { Title } from '../Components/Styled';
import ShowCaseItem from '../Components/ShowCaseItem';
import DXRXItem from '../Components/DXRXItem';
import DrugItem from '../Components/DrugItem';
import ContentActions from '../../../components/ContentActions/ContentActionsComponent';
import ContentStatusBar from '../../../components/ContentStatusBar/ContentStatusBarComponent';
import Comments from '../../../components/Comments/CommentsComponent';

const Wrapper = styled.div`
  padding: 0 1rem;
  @media (min-width: 720px) {
    padding: 1rem 7rem;
  }
`;

const Interactions = styled.div`
  margin-top: 1rem;
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
    min-height: calc(100vh - 599px);
  }
`;

interface ShowCaseStepFourRXProps {
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

function ShowCaseStepFourRX(props: ShowCaseStepFourRXProps) {
  const { caseInfo, onLike, onContentLike, updateCase } = props;
  const [orders, setOrders] = useState<any[]>([]);
  const [drugs, setDrugs] = useState<any[]>([]);

  useEffect(() => {
    const effect = async () => {
      if (!caseInfo) return;
      const { PrescriptionDrug } = caseInfo;
      setOrders(
        PrescriptionDrug && PrescriptionDrug.length > 0
          ? PrescriptionDrug.filter((item: any) => item.DrugId === 0)
          : []
      );

      setDrugs(
        PrescriptionDrug && PrescriptionDrug.length > 0
          ? PrescriptionDrug.filter((item: any) => item.DrugId > 0)
          : []
      );
    };

    effect();
  }, [caseInfo]);

  if (caseInfo === null)
    return (
      <LoadingWrapprer>
        <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
      </LoadingWrapprer>
    );
  // console.log("caseInfo", caseInfo);

  return (
    <div>
      <Wrapper>
        <Drugs>
          {orders.length > 0 && (
            <ShowCaseItem theme={{ hasLine: true }}>
              <Title>Orders :</Title>
              {orders.map(dr => {
                const id = dr.PrescriptionDrugId;
                return (
                  <div key={id}>
                    <DXRXItem
                      item={dr}
                      onLike={voted => onLike('RX', id, voted, true)}
                      onDisLike={voted => onLike('RX', id, voted, false)}
                    />
                  </div>
                );
              })}
            </ShowCaseItem>
          )}

          {drugs.length > 0 && (
            <ShowCaseItem title="Drugs:" theme={{ noLine: true }}>
              {drugs.map((item: any) => {
                return <DrugItem key={item.PrescriptionDrugId} drug={item} />;
              })}
            </ShowCaseItem>
          )}
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
          commentCount={caseInfo.RxCommentCount || 0}
        />
        <Comments
          content={caseInfo}
          source="RX"
          updateContent={() => updateCase()}
          comments={caseInfo.RxComment || []}
        />
      </Interactions>
    </div>
  );
}

export default ShowCaseStepFourRX;
