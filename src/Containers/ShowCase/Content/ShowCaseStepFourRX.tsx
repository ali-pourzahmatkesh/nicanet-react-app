import React, { useState, useEffect } from "react";
import { LoadingWrapprer } from "../Components/Styled";
import { BounceLoader } from "react-spinners";
import Layout from "../../../components/Partials/Layout";
import styled from "styled-components";
import { Title, Wrapper } from "../Components/Styled";
import ShowCaseItem from "../Components/ShowCaseItem";
import DXRXItem from "../Components/DXRXItem";
import DrugItem from "../Components/DrugItem";

export const NoteWrapper = styled.div`
  margin: 1rem 0;
  @media (min-width: 700px) {
    margin: 1rem 3.2rem;
  }
`;

interface ShowCaseStepFourRXProps {
  caseInfo: any;
  onLike: (
    type: string,
    paramsValue: string,
    voted: boolean,
    isLike: boolean
  ) => void;
}

function ShowCaseStepFourRX(props: ShowCaseStepFourRXProps) {
  const { caseInfo, onLike } = props;
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
      <Layout>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );

  // console.log("caseInfo", caseInfo);

  return (
    <Wrapper>
      {orders.length > 0 && (
        <ShowCaseItem theme={{ hasLine: true }}>
          <Title>Orders :</Title>
          {orders.map(dr => {
            const id = dr.PrescriptionDrugId;
            return (
              <div key={id}>
                <DXRXItem
                  item={dr}
                  onLike={voted => onLike("RX", id, voted, true)}
                  onDisLike={voted => onLike("RX", id, voted, false)}
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
    </Wrapper>
  );
}

export default ShowCaseStepFourRX;
