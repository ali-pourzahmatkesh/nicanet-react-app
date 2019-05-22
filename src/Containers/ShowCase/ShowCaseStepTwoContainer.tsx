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
import { Wrapper } from "./Components/Styled";

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
    padding: 0 3rem 2rem;
  }
`;

interface ShowCaseStepTwoContainerProps {
  caseId: string;
}
const ShowCaseStepTwoContainer: React.FC<
  RouteComponentProps<ShowCaseStepTwoContainerProps>
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
  }, [caseId]);

  useEffect(() => {
    const effect = async () => {
      const response = await CaseApi.getDiseases();
      if (response.status !== 200) return;
      setDiseaseArray(response.data);
    };
    effect();
  }, []);

  const goToStepThree = () => {
    props.history.push(`/show-case-step-three/${caseId}`);
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
        title="ROS and Ph/E"
        onGoBack={goToStepOne}
        onGoForward={goToStepThree}
      />
      <Container>
        <MultiButtonWrapper>
          <MultiButton
            activeItemName={activeTabName}
            items={[
              { name: "All", onClick: () => setActiveTabName("All") },
              { name: "Positive", onClick: () => setActiveTabName("Positive") },
              { name: "Negative", onClick: () => setActiveTabName("Negative") }
            ]}
          />
        </MultiButtonWrapper>
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
          <Wrapper>
            <ContinueButton onClick={goToStepThree} />
          </Wrapper>
        )}
      </Container>
    </Layout>
  );
};

export default ShowCaseStepTwoContainer;
