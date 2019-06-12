import React, { useEffect } from 'react';
import { createForm } from 'rc-form';
import Drawer from 'components/Drawer/DrawerComponent';
import { PaddedWrapper, Title } from '../Components/Styled';
import Textarea from 'components/Textarea/TextareaComponent';
import CaseFormItem from './CaseFormItem';
import CasePhotoUploader from '../Components/CasePhotoUploader';

interface AddCaseStepFiveFormTwoProps {
  form: any;
}

function AddCaseStepFiveFormTwo(props: AddCaseStepFiveFormTwoProps) {
  const { getFieldDecorator, getFieldsValue, setFieldsValue } = props.form;

  useEffect(() => {
    const oldValues = localStorage.getItem('AddCaseStepFiveFormTwo');
    if (oldValues === null) return;
    setFieldsValue(JSON.parse(oldValues));
  }, [setFieldsValue]);

  setTimeout(() => {
    localStorage.setItem(
      'AddCaseStepFiveFormTwo',
      JSON.stringify(getFieldsValue())
    );
  }, 0);

  return (
    <div>
      <Drawer title="X - Ray">
        <PaddedWrapper>
          <Title>Chest:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="X-RayChest" />
          </CaseFormItem>

          <Title>Abdomen:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="X-RayAbdomen" />
          </CaseFormItem>

          <Title>Pelvic:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="X-RayPelvic" />
          </CaseFormItem>

          <Title>Other X-Ray Images:</Title>
          <CaseFormItem>
            {getFieldDecorator('DescriptionTypeId_397')(
              <Textarea placeholder="Description" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            <CasePhotoUploader presetName="X-RayOtherX-RayImage" />
          </CaseFormItem>
        </PaddedWrapper>
      </Drawer>

      <Drawer title="Sonography">
        <PaddedWrapper>
          <Title>Abdomen:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="SonographyAbdomen" />
          </CaseFormItem>

          <Title>Kidney, Bladder, Urether:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="SonographyKidneyBladderUrether" />
          </CaseFormItem>

          <Title>Superficial Structures:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="SonographySuperficialStructur" />
          </CaseFormItem>

          <Title>Other Sonography Images:</Title>
          <CaseFormItem>
            {getFieldDecorator('DescriptionTypeId_398')(
              <Textarea placeholder="Description" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            <CasePhotoUploader presetName="SonographyOtherSonographyImage" />
          </CaseFormItem>
        </PaddedWrapper>
      </Drawer>

      <Drawer title="CT - Scan">
        <PaddedWrapper>
          <Title>Chest:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="CTScanChest" />
          </CaseFormItem>

          <Title>Abdomen Pelvic:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="CTScanAbdomenPelvic" />
          </CaseFormItem>

          <Title>Brain:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="CTScanBrain" />
          </CaseFormItem>

          <Title>CT Angiography:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="CTScanCTAngiography" />
          </CaseFormItem>

          <Title>Other CT Scan Images:</Title>
          <CaseFormItem>
            {getFieldDecorator('DescriptionTypeId_399')(
              <Textarea placeholder="Description" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            <CasePhotoUploader presetName="CTScanOtherCTScanImage" />
          </CaseFormItem>
        </PaddedWrapper>
      </Drawer>

      <Drawer title="MRI">
        <PaddedWrapper>
          <Title>Brain:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="MRIBrain" />
          </CaseFormItem>

          <Title>Spine:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="MRISpine" />
          </CaseFormItem>

          <Title>Arm / Foot / Shoulder:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="MRIArm-Foot-Shoulder" />
          </CaseFormItem>

          <Title>Neck:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="MRINeck" />
          </CaseFormItem>

          <Title>Other MRI Images:</Title>
          <CaseFormItem>
            {getFieldDecorator('DescriptionTypeId_401')(
              <Textarea placeholder="Description" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            <CasePhotoUploader presetName="MRIOtherMRIImage" />
          </CaseFormItem>
        </PaddedWrapper>
      </Drawer>

      <Drawer title="Others">
        <PaddedWrapper>
          <Title>Endoscopy:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="OthersEndoscopy" />
          </CaseFormItem>

          <Title>Colonoscopy:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="OthersColonoscopy" />
          </CaseFormItem>

          <Title>MRCP:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="OthersMRCP" />
          </CaseFormItem>

          <Title>ERCP:</Title>
          <CaseFormItem>
            <CasePhotoUploader presetName="OthersERCP" />
          </CaseFormItem>

          <Title>Other Imagings:</Title>
          <CaseFormItem>
            {getFieldDecorator('DescriptionTypeId_404')(
              <Textarea placeholder="Description" />
            )}
          </CaseFormItem>
          <CaseFormItem>
            <CasePhotoUploader presetName="OthersOtherImaging" />
          </CaseFormItem>
        </PaddedWrapper>
      </Drawer>
    </div>
  );
}

export default createForm({ name: 'AddCaseStepFiveFormTwo' })(
  AddCaseStepFiveFormTwo
);
