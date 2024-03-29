import React, { useEffect } from 'react';
import { createForm } from 'rc-form';
import Drawer from 'components/Drawer/DrawerComponent';
import { PaddedWrapper, Title } from '../Components/Styled';
import Textarea from 'components/Textarea/TextareaComponent';
import CaseFormItem from './CaseFormItem';
import CasePhotoUploader from '../Components/CasePhotoUploader';
import { setCase, getCase } from '../../../utils/utils';
import DetectLanguage from '../../../components/DetectLanguage/DetectLanguageComponent';

interface AddCaseStepFiveFormTwoProps {
  form: any;
  caseId: string;
}

function AddCaseStepFiveFormTwo(props: AddCaseStepFiveFormTwoProps) {
  const {
    form: { getFieldDecorator, getFieldsValue, setFieldsValue },
    caseId
  } = props;

  useEffect(() => {
    const effect = async () => {
      const oldValues = await getCase(caseId);
      setFieldsValue(oldValues);
    };
    effect();
  }, [setFieldsValue, caseId]);

  const formValues = getFieldsValue();

  useEffect(() => {
    const effect = async () => {
      await setCase(caseId, getFieldsValue());
    };
    effect();
  }, [caseId, formValues, getFieldsValue]);

  return (
    <div>
      <Drawer title="X - Ray">
        <PaddedWrapper>
          <Title>Chest:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="X-RayChest"
              caseId={caseId}
              fieldName="X-RayChestPhotos"
            />
          </CaseFormItem>

          <Title>Abdomen:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="X-RayAbdomen"
              caseId={caseId}
              fieldName="X-RayAbdomenPhotos"
            />
          </CaseFormItem>

          <Title>Pelvic:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="X-RayPelvic"
              caseId={caseId}
              fieldName="X-RayPelvicPhotos"
            />
          </CaseFormItem>

          <Title>Other X-Ray Images:</Title>
          <CaseFormItem>
            <DetectLanguage value={formValues.DescriptionTypeId_397}>
              {getFieldDecorator('DescriptionTypeId_397')(
                <Textarea placeholder="Description" />
              )}
            </DetectLanguage>
          </CaseFormItem>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="X-RayOtherX-RayImage"
              caseId={caseId}
              fieldName="X-RayOtherX-RayImagePhotos"
            />
          </CaseFormItem>
        </PaddedWrapper>
      </Drawer>

      <Drawer title="Sonography">
        <PaddedWrapper>
          <Title>Abdomen:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="SonographyAbdomen"
              caseId={caseId}
              fieldName="SonographyAbdomenPhotos"
            />
          </CaseFormItem>

          <Title>Kidney, Bladder, Urether:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="SonographyKidneyBladderUrether"
              caseId={caseId}
              fieldName="SonographyKidneyBladderUretherPhotos"
            />
          </CaseFormItem>

          <Title>Superficial Structures:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="SonographySuperficialStructur"
              caseId={caseId}
              fieldName="SonographySuperficialStructurPhotos"
            />
          </CaseFormItem>

          <Title>Other Sonography Images:</Title>
          <CaseFormItem>
            <DetectLanguage value={formValues.DescriptionTypeId_398}>
              {getFieldDecorator('DescriptionTypeId_398')(
                <Textarea placeholder="Description" />
              )}
            </DetectLanguage>
          </CaseFormItem>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="SonographyOtherSonographyImage"
              caseId={caseId}
              fieldName="SonographyOtherSonographyImage"
            />
          </CaseFormItem>
        </PaddedWrapper>
      </Drawer>

      <Drawer title="CT - Scan">
        <PaddedWrapper>
          <Title>Chest:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="CTScanChest"
              caseId={caseId}
              fieldName="CTScanChestPhotos"
            />
          </CaseFormItem>

          <Title>Abdomen Pelvic:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="CTScanAbdomenPelvic"
              caseId={caseId}
              fieldName="CTScanAbdomenPelvicPhotos"
            />
          </CaseFormItem>

          <Title>Brain:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="CTScanBrain"
              caseId={caseId}
              fieldName="CTScanBrainPhotos"
            />
          </CaseFormItem>

          <Title>CT Angiography:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="CTScanCTAngiography"
              caseId={caseId}
              fieldName="CTScanCTAngiographyPhotos"
            />
          </CaseFormItem>

          <Title>Other CT Scan Images:</Title>
          <CaseFormItem>
            <DetectLanguage value={formValues.DescriptionTypeId_399}>
              {getFieldDecorator('DescriptionTypeId_399')(
                <Textarea placeholder="Description" />
              )}
            </DetectLanguage>
          </CaseFormItem>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="CTScanOtherCTScanImage"
              caseId={caseId}
              fieldName="CTScanOtherCTScanImage"
            />
          </CaseFormItem>
        </PaddedWrapper>
      </Drawer>

      <Drawer title="MRI">
        <PaddedWrapper>
          <Title>Brain:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="MRIBrain"
              caseId={caseId}
              fieldName="MRIBrain"
            />
          </CaseFormItem>

          <Title>Spine:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="MRISpine"
              caseId={caseId}
              fieldName="MRISpine"
            />
          </CaseFormItem>

          <Title>Arm / Foot / Shoulder:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="MRIArm-Foot-Shoulder"
              caseId={caseId}
              fieldName="MRIArm-Foot-Shoulder"
            />
          </CaseFormItem>

          <Title>Neck:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="MRINeck"
              caseId={caseId}
              fieldName="MRINeck"
            />
          </CaseFormItem>

          <Title>Other MRI Images:</Title>
          <CaseFormItem>
            <DetectLanguage value={formValues.DescriptionTypeId_401}>
              {getFieldDecorator('DescriptionTypeId_401')(
                <Textarea placeholder="Description" />
              )}
            </DetectLanguage>
          </CaseFormItem>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="MRIOtherMRIImage"
              caseId={caseId}
              fieldName="MRIOtherMRIImage"
            />
          </CaseFormItem>
        </PaddedWrapper>
      </Drawer>

      <Drawer title="Others">
        <PaddedWrapper>
          <Title>Endoscopy:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="OthersEndoscopy"
              caseId={caseId}
              fieldName="OthersEndoscopy"
            />
          </CaseFormItem>

          <Title>Colonoscopy:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="OthersColonoscopy"
              caseId={caseId}
              fieldName="OthersColonoscopy"
            />
          </CaseFormItem>

          <Title>MRCP:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="OthersMRCP"
              caseId={caseId}
              fieldName="OthersMRCP"
            />
          </CaseFormItem>

          <Title>ERCP:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="OthersERCP"
              caseId={caseId}
              fieldName="OthersERCP"
            />
          </CaseFormItem>

          <Title>ECG(ElectroCardioGram):</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="OthersECG"
              caseId={caseId}
              fieldName="OthersECG"
            />
          </CaseFormItem>

          <Title>Echocardiography:</Title>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="OthersERG"
              caseId={caseId}
              fieldName="OthersERG"
            />
          </CaseFormItem>

          <Title>Other Imagings:</Title>
          <CaseFormItem>
            <DetectLanguage value={formValues.DescriptionTypeId_404}>
              {getFieldDecorator('DescriptionTypeId_404')(
                <Textarea placeholder="Description" />
              )}
            </DetectLanguage>
          </CaseFormItem>
          <CaseFormItem>
            <CasePhotoUploader
              presetName="OthersOtherImaging"
              caseId={caseId}
              fieldName="OthersOtherImaging"
            />
          </CaseFormItem>
        </PaddedWrapper>
      </Drawer>
    </div>
  );
}

export default createForm({ name: 'AddCaseStepFiveFormTwo' })(
  AddCaseStepFiveFormTwo
);
