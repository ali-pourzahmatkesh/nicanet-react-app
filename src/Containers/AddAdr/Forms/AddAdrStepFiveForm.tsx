import React, { useState } from 'react';
import { createForm } from 'rc-form';
import AdrFormItem from './AdrFormItem';
import { Title } from 'Containers/AddCase/Components/Styled';
import ContinueButton from 'Containers/AddCase/Components/ContinueButton';
import Textarea from 'components/Textarea/TextareaComponent';
import DetectLanguage from '../../../components/DetectLanguage/DetectLanguageComponent';
interface AddAdrStepFiveFormProps {
  form: any;
  onSubmit: (values: any) => Promise<any>;
}

function AddAdrStepFiveForm(props: AddAdrStepFiveFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adrDrugs] = useState<any[]>([]);

  const {
    form: { getFieldDecorator, validateFields, getFieldsValue },
    onSubmit
  } = props;
  const formValues = getFieldsValue();

  const submit = () => {
    validateFields(async (error: any, values: any) => {
      if (error !== null) return;
      try {
        setIsSubmitting(true);
        await onSubmit({ adrDrugs });
      } catch (_) {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div>
      <Title>If necessary, enter the required explanation:</Title>
      <AdrFormItem>
        <DetectLanguage value={formValues.Explanation}>
          {getFieldDecorator('Explanation')(
            <Textarea placeholder="Write Description" />
          )}
        </DetectLanguage>
      </AdrFormItem>
      <ContinueButton
        title="Add ADR"
        isLoading={isSubmitting}
        onClick={submit}
      />
    </div>
  );
}

export default createForm({ name: 'AddAdrStepFiveForm' })(AddAdrStepFiveForm);
