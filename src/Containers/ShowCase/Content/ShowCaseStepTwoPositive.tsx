import React, { Fragment } from "react";
import Drawer from "components/Drawer/DrawerComponent";
import { PaddedWrapper, Title, LoadingWrapprer } from "../Components/Styled";
import { BounceLoader } from "react-spinners";
import Layout from "../../../components/Partials/Layout";
import styled from "styled-components";
import { Value, Row, Col } from "../Components/Styled";

const CaptionWrapprer = styled.div`
  margin-top: 1rem;
`;

export const NoteWrapper = styled.div`
  margin: 1rem 0;
`;

interface ShowCaseStepTwoAllProps {
  diseaseArrayFiltred: any[];
  caseInfo: any;
  signSymptoms: any[];
}

function ShowCaseStepTwoPositive(props: ShowCaseStepTwoAllProps) {
  const { caseInfo, diseaseArrayFiltred, signSymptoms } = props;

  // console.log("diseaseArrayFiltred", diseaseArrayFiltred);

  if (caseInfo === null)
    return (
      <Layout>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );

  const signSymptomsPositive = signSymptoms.filter(ss => ss.Value === true);

  return (
    <div>
      {signSymptomsPositive.length > 0 &&
        diseaseArrayFiltred.map((node: any) => {
          return (
            <Drawer key={node.Title} title={node.Title}>
              <PaddedWrapper>
                {node.Children.map((childNode: any) => {
                  const signSymptom =
                    signSymptoms.find(
                      (signSymptomItem: any) =>
                        signSymptomItem.DiseaseId === childNode.DiseaseId &&
                        signSymptomItem.Value === true
                    ) || {};
                  const signSymptomNote = signSymptom.Note;
                  const signSymptomValue = signSymptom.Value;

                  if (
                    signSymptom.DiseaseId === childNode.DiseaseId &&
                    signSymptomValue === true
                  ) {
                    switch (childNode.LevelId) {
                      case 371:
                        return (
                          <CaptionWrapprer key={childNode.DiseaseId.toString()}>
                            <Title primary>{childNode.Title.trim()}</Title>
                          </CaptionWrapprer>
                        );
                      case 372:
                        return (
                          <Fragment key={childNode.DiseaseId.toString()}>
                            <Row>
                              <Col>{childNode.Title.trim()}</Col>
                              <Col color="#5498A9">Yes</Col>
                            </Row>
                          </Fragment>
                        );
                      case 373:
                        return (
                          <Fragment key={childNode.DiseaseId.toString()}>
                            {signSymptomNote && (
                              <NoteWrapper>
                                <Value noIndent>{signSymptomNote}</Value>
                              </NoteWrapper>
                            )}
                          </Fragment>
                        );
                      default:
                        return null;
                    }
                  }
                })}
              </PaddedWrapper>
            </Drawer>
          );
        })}
    </div>
  );
}

export default ShowCaseStepTwoPositive;
