import React from 'react'
import { createForm } from 'rc-form';
import CaseFormItem from './CaseFormItem';
import Textarea from 'components/Textarea/TextareaComponent';
import { Title, PaddedWrapper } from '../Components/Styled';
import AddDrugForm from './AddDrugForm';

interface AddCaseStepSixFormProps {
  form: any
}


function AddCaseStepSixForm(props: AddCaseStepSixFormProps) {

  const {
    getFieldDecorator
  } = props.form;

  return (
    <div>
      <Title>Chief Complaint (CC):</Title>
      <PaddedWrapper>
        <CaseFormItem>
          {getFieldDecorator('Write your Diagnosis')(
            <Textarea placeholder="Write your Diagnosis" />
            )}
        </CaseFormItem>
      </PaddedWrapper>
      <Title>Prescription (RX):</Title>
      <PaddedWrapper>
        <CaseFormItem>
          {getFieldDecorator('Write your Prescription')(
            <Textarea placeholder="Write your Prescription" />
            )}
        </CaseFormItem>
      </PaddedWrapper>
      <CaseFormItem>
        {getFieldDecorator('adddrug1')(
          <AddDrugForm />
        )}
      </CaseFormItem>
    </div>
  )
}


export default createForm({ name: 'AddCaseStepSixForm' })(AddCaseStepSixForm);
