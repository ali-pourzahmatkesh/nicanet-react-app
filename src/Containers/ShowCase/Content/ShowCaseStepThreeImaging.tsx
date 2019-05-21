import React, { Fragment } from "react";
import Drawer from "components/Drawer/DrawerComponent";
import { PaddedWrapper, Title, LoadingWrapprer } from "../Components/Styled";
import { BounceLoader } from "react-spinners";
import Layout from "../../../components/Partials/Layout";
import styled from "styled-components";
import { Value, Row, Col } from "../Components/Styled";
import ShowCaseItem from "../Components/ShowCaseItem";
import ImageSlider from "../../../components/ImageSlider/ImageSliderComponent";
import Imaging from "../MockData/ShowCaseStepThreeImaging.json";

export const NoteWrapper = styled.div`
  margin: 1rem 0;
`;

interface ShowCaseStepThreeImagingProps {
  caseInfo: any;
}

function ShowCaseStepThreeImaging(props: ShowCaseStepThreeImagingProps) {
  const { caseInfo } = props;

  const array1 = Imaging.filter(MainCase => {
    const array2 = MainCase.children.filter(minicase => {
      const caseImages = caseInfo.CaseImages.filter(
        (item: any) => item.TypeId === minicase.imageTypeId
      );
      const ImagingDescription = caseInfo.ImagingDescription.filter(
        (item: any) => item.DescriptionTypeId === minicase.DescriptionTypeId
      );
      return caseImages.length > 0 || ImagingDescription.length > 0;
    });
    return array2.length > 0;
  });

  if (caseInfo === null)
    return (
      <Layout>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );

  return (
    <div>
      {array1.length > 0 &&
        array1.map((node: any, index: any) => {
          return (
            <Drawer key={index.toString()} title={node.title}>
              <PaddedWrapper>
                {node.children.map((childNode: any, childIndex: any) => {
                  const caseImages = caseInfo.CaseImages.filter(
                    (item: any) => item.TypeId === childNode.imageTypeId
                  );
                  const ImagingDescription = caseInfo.ImagingDescription.filter(
                    (item: any) =>
                      item.DescriptionTypeId === childNode.DescriptionTypeId
                  );

                  return (
                    <Fragment key={childIndex.toString()}>
                      {caseInfo.CaseImages && caseImages.length > 0 && (
                        <ShowCaseItem
                          title={`${childNode.title} :`}
                          theme={{ noLine: true }}
                        >
                          <ImageSlider showsButtons images={caseImages} />
                        </ShowCaseItem>
                      )}

                      {childNode.DescriptionTypeId &&
                        ImagingDescription.length > 0 && (
                          <NoteWrapper>
                            <Title>Description:</Title>
                            <Value noIndent>
                              {ImagingDescription[0].Description.trim()}
                            </Value>
                          </NoteWrapper>
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

export default ShowCaseStepThreeImaging;
