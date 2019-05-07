import React, { useState, useEffect } from 'react'
import { createForm } from 'rc-form';
import CaseFormItem from './CaseFormItem';
import Textarea from 'components/Textarea/TextareaComponent';
import { Title, PaddedWrapper } from '../Components/Styled';
import CheckBox from 'components/CheckBox/CheckBoxComponent';
import { ConfigApi } from 'Api/ConfigApi';
import ContinueButton from '../Components/ContinueButton';

interface AddCaseStepTwoFormProps {
  form: any
  onSubmit: (values: any) => Promise<any>
}

function AddCaseStepTwoForm(props: AddCaseStepTwoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pastMedicalHistories, setPastMedicalHistories] = useState(false)
  
  const {
    form: {
      getFieldDecorator,
      validateFields,
    },
    onSubmit,
  } = props;

  const submit = () => {
    validateFields(async (error: any, values: any) => {
      if (error !== null) return
      try {
        setIsSubmitting(true)
        await onSubmit(values)
      } catch (_) {
        setIsSubmitting(false)
      }
    });
  }

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await ConfigApi.getConfig(45)
        if (response.status !== 200) setTimeout(effect(), 3000)
        console.log('response', response)
        
      } catch (_) {}
    }
    effect()
  }, [])

  return (
    <div>
      <Title>Past Medical History (PMH):</Title>
      <PaddedWrapper>
        {getFieldDecorator('test1')(
          <CheckBox name="Diabetes" />
        )}
        {getFieldDecorator('test2')(
          <CheckBox name="Cardiovascular Disease" />
        )}
        {getFieldDecorator('test3')(
          <CheckBox name="Depression and Mood Disorders" />
        )}
        {getFieldDecorator('test4')(
          <CheckBox name="Respiratory Disease" />
        )}
        {getFieldDecorator('test5')(
          <CheckBox name="Liver Disease" />
        )}
      </PaddedWrapper>
      <Title>Past Surgical History (PSH):</Title>
      <CaseFormItem>
        {getFieldDecorator('test1')(
          <Textarea placeholder="Description" />
        )}
      </CaseFormItem>
      <Title>Family History (FH):</Title>
      <CaseFormItem>
        {getFieldDecorator('test1')(
          <Textarea placeholder="Description" />
        )}
      </CaseFormItem>
      <ContinueButton onClick={submit} isLoading={isSubmitting} />
    </div>
  )
}


export default createForm({ name: 'AddCaseStepTwoForm' })(AddCaseStepTwoForm);
