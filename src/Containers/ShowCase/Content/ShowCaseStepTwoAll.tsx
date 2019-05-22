import React, { useState, useEffect, Fragment } from "react";
import Drawer from "components/Drawer/DrawerComponent";
import { PaddedWrapper, Title, LoadingWrapprer } from "../Components/Styled";
import { BounceLoader } from "react-spinners";
import Layout from "../../../components/Partials/Layout";
import styled from "styled-components";
import { Value, Row, Col, Wrapper } from "../Components/Styled";
import ShowCaseItem from "../Components/ShowCaseItem";
import ImageSlider from "../../../components/ImageSlider/ImageSliderComponent";

const CaptionWrapprer = styled.div`
  margin-top: 1rem;
  @media (min-width: 700px) {
    padding: 0 3.2rem;
  }
`;

export const NoteWrapper = styled.div`
  margin: 1rem 0;
  @media (min-width: 700px) {
    padding: 0 3.2rem;
  }
`;

interface ShowCaseStepTwoAllProps {
  diseaseArray: any[];
  caseInfo: any;
  signSymptoms: any[];
}

function ShowCaseStepTwoAll(props: ShowCaseStepTwoAllProps) {
  const { caseInfo, diseaseArray, signSymptoms } = props;
  const [signSymptomImage, setSignSymptomImages] = useState<any[]>([]);

  useEffect(() => {
    const effect = async () => {
      if (!caseInfo) return;
      const caseImages = caseInfo.CaseImages;
      setSignSymptomImages(
        caseImages.filter((item: any) => item.TypeId === 146)
      );
    };

    effect();
  }, [caseInfo]);

  if (caseInfo === null || diseaseArray.length === 0)
    return (
      <Layout>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );

  // console.log("diseaseArray", diseaseArray);
  // console.log("caseInfo", caseInfo);

  return (
    <div>
      {diseaseArray.map((node: any) => {
        return (
          <Drawer key={node.Title} title={node.Title}>
            <PaddedWrapper>
              {node.Children.map((childNode: any) => {
                const signSymptom =
                  signSymptoms.find(
                    (signSymptomItem: any) =>
                      signSymptomItem.DiseaseId === childNode.DiseaseId
                  ) || {};
                const signSymptomValue = signSymptom.Value;
                const signSymptomNote = signSymptom.Note;

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
                          <Col
                            color={
                              signSymptomValue !== undefined
                                ? signSymptomValue
                                  ? "#5498A9"
                                  : "#f5a623"
                                : "#bdbdbd"
                            }
                          >
                            {signSymptomValue !== undefined
                              ? signSymptomValue
                                ? "Yes"
                                : "No"
                              : "unknown"}
                          </Col>
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
              })}
            </PaddedWrapper>
          </Drawer>
        );
      })}

      {signSymptomImage.length > 0 && (
        <Wrapper>
          <ShowCaseItem title="Photos:" theme={{ noLine: true }}>
            <ImageSlider showsButtons images={signSymptomImage} />
          </ShowCaseItem>
        </Wrapper>
      )}
    </div>
  );
}

export default ShowCaseStepTwoAll;
