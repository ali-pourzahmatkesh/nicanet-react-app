import React, { Fragment } from 'react';
import Drawer from 'components/Drawer/DrawerComponent';
import { PaddedWrapper, Title, LoadingWrapprer } from '../Components/Styled';
import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';
import { Value, Row, Col } from '../Components/Styled';
import DetectLanguage from '../../../components/DetectLanguage/DetectLanguageComponent';

const CaptionWrapprer = styled.div`
  margin-top: 1rem;
  @media (min-width: 720px) {
    padding: 0 3.2rem;
  }
`;

const NoteWrapper = styled.div`
  margin: 1rem 0;
  @media (min-width: 720px) {
    padding: 0 3.2rem;
  }
`;

interface ShowCaseStepTwoAllProps {
  diseaseArray: any[];
  caseInfo: any;
  signSymptoms: any[];
}

function ShowCaseStepTwoPositive(props: ShowCaseStepTwoAllProps) {
  const { caseInfo, diseaseArray, signSymptoms } = props;

  if (caseInfo === null)
    return (
      <LoadingWrapprer>
        <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
      </LoadingWrapprer>
    );

  const signSymptomsPositive = signSymptoms.filter(ss => ss.Value === true);

  const diseaseArrayFiltred = diseaseArray.filter(diseaseParent => {
    const filtredDiseaseChildren = diseaseParent.Children.filter(
      (child: any) => {
        const signSymptom =
          signSymptomsPositive.find(
            (signSymptomItem: any) =>
              signSymptomItem.DiseaseId === child.DiseaseId
          ) || {};
        return signSymptom.DiseaseId === child.DiseaseId;
      }
    );
    return filtredDiseaseChildren.length > 0;
  });

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
                                <DetectLanguage value={signSymptomNote}>
                                  <Value noIndent>{signSymptomNote}</Value>
                                </DetectLanguage>
                              </NoteWrapper>
                            )}
                          </Fragment>
                        );
                      default:
                        return null;
                    }
                  } else {
                    return null;
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
