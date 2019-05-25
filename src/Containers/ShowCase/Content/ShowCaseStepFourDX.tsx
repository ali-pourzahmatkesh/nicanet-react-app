import React, { useState, useEffect } from 'react';
import { LoadingWrapprer } from '../Components/Styled';
import { BounceLoader } from 'react-spinners';
import Layout from '../../../components/Partials/Layout';
import styled from 'styled-components';
import { Wrapper } from '../Components/Styled';
import DXRXItem from '../Components/DXRXItem';

export const NoteWrapper = styled.div`
  margin: 1rem 0;
  @media (min-width: 700px) {
    margin: 1rem 3.2rem;
  }
`;

interface ShowCaseStepFourDXProps {
  caseInfo: any;
  onLike: (
    type: string,
    paramsValue: string,
    voted: boolean,
    isLike: boolean
  ) => void;
}

function ShowCaseStepFourDX(props: ShowCaseStepFourDXProps) {
  const { caseInfo, onLike } = props;
  const [diagnosis, setDiagnosis] = useState<any[]>([]);

  useEffect(() => {
    const effect = async () => {
      if (!caseInfo) return;
      setDiagnosis(caseInfo.Diagnosis);
    };

    effect();
  }, [caseInfo]);

  // console.log("caseInfo", caseInfo);

  if (caseInfo === null)
    return (
      <Layout>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default ShowCaseStepFourDX;
