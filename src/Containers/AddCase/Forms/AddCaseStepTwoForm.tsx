import React from 'react'
import { createForm } from 'rc-form';
import CaseFormItem from './CaseFormItem';
import Textarea from 'components/Textarea/TextareaComponent';
import { Title, PaddedWrapper } from '../Components/Styled';
import CheckBox from 'components/CheckBox/CheckBoxComponent';

interface AddCaseStepTwoFormProps {
  form: any
}

function AddCaseStepTwoForm(props: AddCaseStepTwoFormProps) {

  const {
    getFieldDecorator
  } = props.form;

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
    </div>
  )
}


export default createForm({ name: 'AddCaseStepTwoForm' })(AddCaseStepTwoForm);
