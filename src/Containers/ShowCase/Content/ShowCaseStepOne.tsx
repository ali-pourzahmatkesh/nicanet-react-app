import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BounceLoader } from "react-spinners";
import { CaseApi } from "../../../Api/CaseApi";
import Layout from "../../../components/Partials/Layout";
import { Title, Value } from "../Components/Styled";
import ShowCaseItem from "../Components/ShowCaseItem";
import ImageSlider from "../../../components/ImageSlider/ImageSliderComponent";

const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

interface ShowCaseStepOneProps {
  caseId: string;
}

function ShowCaseStepOne(props: ShowCaseStepOneProps) {
  const { caseId } = props;
  const [caseInfo, setCase] = useState(null);

  useEffect(() => {
    const effect = async () => {
      const response = await CaseApi.getCase(caseId, true);
      console.log("response", response);
      if (response.status === 200) {
        setCase(response.data);
        localStorage.setItem("caseInfo", JSON.stringify(response.data));
      }
    };

    effect();
  }, [caseId]);

  if (caseInfo === null)
    return (
      <Layout>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );

  const { Patient, ChiefComplaint } = caseInfo;
  const { PatientDescription, Height, Weight } = Patient;

  return (
    <div>
      {PatientDescription && (
        <ShowCaseItem>
          <Title>Patient Information:</Title>
          <Value>{PatientDescription}</Value>
          {Height > 0 && <div>Height: {Height}</div>}
          {Weight > 0 && <div>Weight: {Weight}</div>}
        </ShowCaseItem>
      )}

      {ChiefComplaint && (
        <ShowCaseItem>
          <Title>Chief Complaint(CC):</Title>
          <Value>{ChiefComplaint}</Value>
        </ShowCaseItem>
      )}
      <div>
        <ImageSlider images={[]} />
      </div>
    </div>
  );
}

export default ShowCaseStepOne;
