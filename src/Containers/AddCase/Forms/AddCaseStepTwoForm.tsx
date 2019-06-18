import React, { useState, useEffect } from 'react';
import { createForm } from 'rc-form';
import CaseFormItem from './CaseFormItem';
import Textarea from 'components/Textarea/TextareaComponent';
import { Title, PaddedWrapper } from '../Components/Styled';
import CheckBox from 'components/CheckBox/CheckBoxComponent';
import { ConfigApi } from 'Api/ConfigApi';
import ContinueButton from '../Components/ContinueButton';
import { getCase } from '../../../utils/utils';
import DetectLanguage from '../../../components/DetectLanguage/DetectLanguageComponent';

interface AddCaseStepTwoFormProps {
  form: any;
  onSubmit: (values: any) => Promise<any>;
  caseId: string;
}

function AddCaseStepTwoForm(props: AddCaseStepTwoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pastMedicalHistories, setPastMedicalHistories] = useState<any[]>([]);

  const {
    form: { getFieldDecorator, validateFields, setFieldsValue, getFieldsValue },
    onSubmit,
    caseId
  } = props;

  const formValues = getFieldsValue();

  const submit = () => {
    validateFields(async (error: any, values: any) => {
      if (error !== null) return;
      try {
        setIsSubmitting(true);
        await onSubmit(values);
      } catch (_) {
        setIsSubmitting(false);
      }
    });
  };

  useEffect(() => {
    const effect = async () => {
      const oldValues = await getCase(caseId);
      setFieldsValue(oldValues);
    };
    effect();
  }, [setFieldsValue, pastMedicalHistories, caseId]);

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await ConfigApi.getConfig(45);
        if (response.status !== 200) setTimeout(() => effect(), 3000);
        setPastMedicalHistories(
          response.data.map((item: any) => ({
            ConfigId: item.ConfigId,
            ConfigName: item.ConfigName
          }))
        );
      } catch (_) {}
    };
    effect();
  }, []);

  return (
    <div>
      <Title>Past Medical History (PMH):</Title>
      <PaddedWrapper>
        {pastMedicalHistories.map((disease: any) => (
          <div key={disease.ConfigName}>
            {getFieldDecorator(`disease_${disease.ConfigId}`)(
              <CheckBox name={disease.ConfigName} />
            )}
          </div>
        ))}
        <CaseFormItem>
          <DetectLanguage value={formValues.PastMedicalHistory}>
            {getFieldDecorator('PastMedicalHistory')(
              <Textarea placeholder="Description" />
            )}
          </DetectLanguage>
        </CaseFormItem>
      </PaddedWrapper>
      <Title>Past Surgical History (PSH):</Title>
      <CaseFormItem>
        <DetectLanguage value={formValues.PastSurgicalHistory}>
          {getFieldDecorator('PastSurgicalHistory')(
            <Textarea placeholder="Description" />
          )}
        </DetectLanguage>
      </CaseFormItem>
      <Title>Family History (FH):</Title>
      <CaseFormItem>
        <DetectLanguage value={formValues.FamilyHistory}>
          {getFieldDecorator('FamilyHistory')(
            <Textarea placeholder="Description" />
          )}
        </DetectLanguage>
      </CaseFormItem>
      <ContinueButton onClick={submit} isLoading={isSubmitting} />
    </div>
  );
}

export default createForm({ name: 'AddCaseStepTwoForm' })(AddCaseStepTwoForm);
