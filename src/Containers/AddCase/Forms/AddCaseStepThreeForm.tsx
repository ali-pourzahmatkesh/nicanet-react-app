import React from 'react'
import { createForm } from 'rc-form';
import CaseFormItem from './CaseFormItem';
import Textarea from 'components/Textarea/TextareaComponent';
import { Title, PaddedWrapper } from '../Components/Styled';
import CheckBox from 'components/CheckBox/CheckBoxComponent';
import Input from 'components/Input/InputComponent';
import AddDrugForm from './AddDrugForm';

interface AddCaseStepThreeFormProps {
  form: any
}

function AddCaseStepThreeForm(props: AddCaseStepThreeFormProps) {

  const {
    getFieldDecorator
  } = props.form;

  return (
    <div>
      <Title>Drug History (DH):</Title>
      <PaddedWrapper>
        <CaseFormItem>
          {getFieldDecorator('adddrug1')(
            <AddDrugForm />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('Note')(
            <Textarea placeholder="Note" />
          )}
        </CaseFormItem>
      </PaddedWrapper>
      <Title>Over The Counter Drugs (OTC):</Title>
      <PaddedWrapper>
        <CaseFormItem>
          {getFieldDecorator('adddrug2')(
            <AddDrugForm />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('note2')(
            <Textarea placeholder="Note" />
          )}
        </CaseFormItem>
      </PaddedWrapper>

      <Title>Habitual History:</Title>
      <PaddedWrapper>
        {/* ----------- one 1 ----------- */}
        {getFieldDecorator('one-1')(
          <CheckBox name="Cigarette & Nicotine Containing Substances" />
        )}
        <CaseFormItem>
          {getFieldDecorator('one-2')(
            <Input placeholder="Daily usege" />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('one-3')(
            <Input placeholder="Duration" />
          )}
        </CaseFormItem>
        {/* ----------- two 2 ----------- */}
        {getFieldDecorator('two-1')(
          <CheckBox name="Opium" />
        )}
        <CaseFormItem>
          {getFieldDecorator('two-1')(
            <Input placeholder="Daily usege" />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('two-1')(
            <Input placeholder="Duration" />
          )}
        </CaseFormItem>

        {/* ----------- three 3 ----------- */}
        {getFieldDecorator('three-1')(
          <CheckBox name="Alcohol" />
        )}
        <CaseFormItem>
          {getFieldDecorator('three-2')(
            <Input placeholder="Daily usege" />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('three-3')(
            <Input placeholder="Duration" />
          )}
        </CaseFormItem>
        {/* ----------- four 4 ----------- */}
        {getFieldDecorator('four-1')(
          <CheckBox name="Cannabinoids" />
        )}
        <CaseFormItem>
          {getFieldDecorator('four-2')(
            <Input placeholder="Daily usege" />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('four-3')(
            <Input placeholder="Duration" />
          )}
        </CaseFormItem>
        {/* ----------- five 5 ----------- */}
        {getFieldDecorator('five-1')(
          <CheckBox name="Ecstasy Pills" />
        )}
        <CaseFormItem>
          {getFieldDecorator('five-2')(
            <Input placeholder="Daily usege" />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('five-3')(
            <Input placeholder="Duration" />
          )}
        </CaseFormItem>
        {/* ----------- six 6 ----------- */}
        {getFieldDecorator('six-1')(
          <CheckBox name="Others" />
        )}
        <CaseFormItem>
          {getFieldDecorator('six-2')(
            <Textarea placeholder="Type of addiction and description" />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('six-3')(
            <Input placeholder="Daily usege" />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('six-4')(
            <Input placeholder="Duration" />
          )}
        </CaseFormItem>
      </PaddedWrapper>

      <Title>Herbal History:</Title>
      <PaddedWrapper>
        {getFieldDecorator('test1')(
          <CheckBox name="Viper's-buglosses (Gole Gav Zaban)" />
        )}
        {getFieldDecorator('test2')(
          <CheckBox name="Valerian (Sonbol-o-Tib)" />
        )}
        {getFieldDecorator('test3')(
          <CheckBox name="Chicory (Kasni)" />
        )}
        {getFieldDecorator('test4')(
          <CheckBox name="Alhagi (Khaar Shotor)" />
        )}
        {getFieldDecorator('test5')(
          <CheckBox name="Milk thistle (Khaar Maryam)" />
        )}
      </PaddedWrapper>
    </div>
  )
}


export default createForm({ name: 'AddCaseStepThreeForm' })(AddCaseStepThreeForm);
