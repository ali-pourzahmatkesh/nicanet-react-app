import React, { useState, useEffect, Fragment } from 'react';
import Drawer from 'components/Drawer/DrawerComponent';
import { PaddedWrapper, Title, LoadingWrapprer } from '../Components/Styled';
import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';
import { Value, Row, Col } from '../Components/Styled';
import ShowCaseItem from '../Components/ShowCaseItem';
import ImageSlider from '../../../components/ImageSlider/ImageSliderComponent';

const CaptionWrapprer = styled.div`
  margin-top: 1rem;
`;

const NoteWrapper = styled.div`
  margin: 1rem 0;
  @media (min-width: 720px) {
    margin: 1rem 3.2rem;
  }
`;

interface ShowCaseStepThreeLabTestProps {
  examinationArray: any[];
  caseInfo: any;
  caseExaminations: any[];
}

function ShowCaseStepThreeLabTest(props: ShowCaseStepThreeLabTestProps) {
  const { caseInfo, examinationArray, caseExaminations } = props;
  const [caseImages, setCaseImages] = useState<any[]>([]);

  useEffect(() => {
    const effect = async () => {
      if (!caseInfo) return;
      setCaseImages(caseInfo.CaseImages);
    };

    effect();
  }, [caseInfo]);

  // console.log("caseInfo", caseInfo);
  // console.log("examinationArray", examinationArray);

  if (caseInfo === null)
    return (
      <LoadingWrapprer>
        <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
      </LoadingWrapprer>
    );

  return (
    <div>
      {examinationArray.map((node: any) => {
        return (
          <Drawer key={node.Title} title={node.Title}>
            <PaddedWrapper>
              {node.Children.map((childNode: any) => {
                const examination =
                  caseExaminations.find(
                    (examinationItem: any) =>
                      examinationItem.ExaminationTypeId ===
                      childNode.ExaminationTypeId
                  ) || {};
                const examinationNote = examination.Note;
                const examinationValue =
                  examination.ExaminationValue &&
                  examination.ExaminationValue.trim();
                const examinationUnitText =
                  examination.UnitText && examination.UnitText.trim();
                const examinationImageType = examination.ImageType;

                return (
                  <Fragment key={childNode.ExaminationTypeId.toString()}>
                    {childNode.Level === 'Caption' && (
                      <CaptionWrapprer>
                        <Title>{childNode.Title.trim()}</Title>
                      </CaptionWrapprer>
                    )}

                    {childNode.Title.trim() === 'Note' && examinationNote && (
                      <NoteWrapper>
                        <Title>Note:</Title>
                        <Value noIndent>{examinationNote}</Value>
                      </NoteWrapper>
                    )}

                    {childNode.Title.trim() !== 'Note' &&
                      childNode.Level !== 'Caption' && (
                        <Row>
                          <Col>{childNode.Title.trim()}</Col>
                          <Col
                            color={
                              examination !== undefined ? '#5498A9' : '#bdbdbd'
                            }
                          >
                            {examination !== undefined
                              ? `${examinationValue} ${
                                  examinationUnitText !== '0'
                                    ? examinationUnitText
                                    : ''
                                }`
                              : '---'}
                          </Col>
                        </Row>
                      )}
                    {childNode.NeedImage === true &&
                      examinationImageType &&
                      caseImages.filter(
                        item => item.TypeId === examinationImageType
                      ).length > 0 && (
                        <ShowCaseItem title="Photos:" theme={{ noLine: true }}>
                          <ImageSlider
                            showsButtons
                            images={caseImages.filter(
                              item => item.TypeId === examinationImageType
                            )}
                          />
                        </ShowCaseItem>
                      )}
                  </Fragment>
                );
              })}
            </PaddedWrapper>
          </Drawer>
        );
      })}
    </div>
  );
}

export default ShowCaseStepThreeLabTest;
