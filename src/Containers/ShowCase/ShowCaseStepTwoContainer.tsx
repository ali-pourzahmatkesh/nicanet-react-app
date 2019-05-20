import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "components/Partials/Layout";
import { RouteComponentProps } from "react-router";
import { CaseApi } from "Api/CaseApi";
import Heading from "./Components/Heading";
import MultiButton from "components/MultiButton/MultiButton";
import ContinueButton from "./Components/ContinueButton";
import ShowCaseStepTwoAll from "./Content/ShowCaseStepTwoAll";
import ShowCaseStepTwoPositive from "./Content/ShowCaseStepTwoPositive";
import ShowCaseStepTwoNegative from "./Content/ShowCaseStepTwoNegative";

const Container = styled.div`
  padding: 2rem 1rem 0;
`;

const Content = styled.div`
  min-height: 12rem;
`;

interface ShowCaseStepOneContainerProps {
  caseId: string;
}
const ShowCaseStepOneContainer: React.FC<
  RouteComponentProps<ShowCaseStepOneContainerProps>
> = props => {
  const { caseId } = props.match.params;
  const [activeTabName, setActiveTabName] = useState("All");
  const [caseInfo, setCaseInfo] = useState(null);
  const [diseaseArray, setDiseaseArray] = useState<any[]>([]);
  const [signSymptoms, setSignSymptoms] = useState<any[]>([]);

  useEffect(() => {
    const effect = async () => {
      const response = await CaseApi.getCase(caseId, false);
      if (response.status !== 200) return;
      setCaseInfo(response.data);
      setSignSymptoms(response.data.SignSymptoms);
    };
    effect();
  }, []);

  useEffect(() => {
    const effect = async () => {
      const response = await CaseApi.getDiseases();
      if (response.status !== 200) return;
      setDiseaseArray(response.data);
    };
    effect();
  }, []);

  const goToStepThree = () => {
    props.history.push(`/show-case-step-one/${caseId}`);
  };

  const goToStepOne = () => {
    props.history.push(`/show-case-step-one/${caseId}`);
  };

  const diseaseArrayFiltred = diseaseArray.filter(diseaseParent => {
    const filtredDiseaseChildren = diseaseParent.Children.filter(
      (child: any) => {
        const signSymptom =
          signSymptoms.find(
            (signSymptomItem: any) =>
              signSymptomItem.DiseaseId === child.DiseaseId
          ) || {};
        return signSymptom.DiseaseId === child.DiseaseId;
      }
    );
    return filtredDiseaseChildren.length > 0;
  });

  return (
    <Layout>
      <Heading
        title="Case Report"
        onGoBack={goToStepOne}
        onGoForward={goToStepThree}
      />
      <Container>
        <MultiButton
          activeItemName={activeTabName}
          items={[
            { name: "All", onClick: () => setActiveTabName("All") },
            { name: "Positive", onClick: () => setActiveTabName("Positive") },
            { name: "Negative", onClick: () => setActiveTabName("Negative") }
          ]}
        />
        <Content>
        {activeTabName === "All" && (
          <ShowCaseStepTwoAll
            caseInfo={caseInfo}
            diseaseArray={diseaseArray}
            signSymptoms={signSymptoms}
          />
        )}
        {activeTabName === "Positive" && (
          <ShowCaseStepTwoPositive
            diseaseArrayFiltred={diseaseArrayFiltred || []}
            caseInfo={caseInfo}
            signSymptoms={signSymptoms}
          />
        )}
        {activeTabName === "Negative" && (
          <ShowCaseStepTwoNegative
            diseaseArrayFiltred={diseaseArrayFiltred || []}
            caseInfo={caseInfo}
            signSymptoms={signSymptoms}
          />
        )}
        </Content>
        {caseInfo !== null && diseaseArray.length > 0 && (
          <ContinueButton onClick={goToStepThree} />
        )}
      </Container>
    </Layout>
  );
};

export default ShowCaseStepOneContainer;
