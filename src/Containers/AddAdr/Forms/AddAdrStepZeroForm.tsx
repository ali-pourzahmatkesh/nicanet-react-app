import React, { useState, useEffect } from 'react'
import { createForm } from 'rc-form';
import styled from 'styled-components';
import Select from 'components/Select/SelectComponent';
import AdrFormItem from './AdrFormItem';
import Radio from 'components/Radio/RadioComponent';
import Input from 'components/Input/InputComponent';
import { Title } from 'Containers/AddCase/Components/Styled';
import ContinueButton from 'Containers/AddCase/Components/ContinueButton';

const WeightAndHeight = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    flex: 0.4;
  }
`

const YearsofBirth = new Array(100).fill(null).map((item: any, index: number) => {
  const year = (1397 - index).toString()
  return { value: year, name: year }
})

const Weights = new Array(200).fill(null).map((item, index) => {
  const weight = 200 - index
  return { value: weight.toString(), name: `${weight} KG` }
}).slice(0, -1)

const Heights = new Array(230).fill(null).map((item, index) => {
  const height = 230 - index
  return { value: height.toString(), name: `${height} CM` }
}).slice(0, -20)

interface AddAdrStepZeroFormProps {
  form: any
  onSubmit: (values: any) => Promise<any>
}

function AddAdrStepZeroForm(props: AddAdrStepZeroFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const onSelect = console.log
  const {
    form: {
      getFieldDecorator,
      validateFields,
    },
    onSubmit
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

  return (
    <div>
      <AdrFormItem>
        {getFieldDecorator('NationalCode')(
          <Input placeholder="National Code" />
        )}
      </AdrFormItem>
      <AdrFormItem>
        {getFieldDecorator('FirstName')(
          <Input placeholder="First Name" />
        )}
      </AdrFormItem>
      <AdrFormItem>
        {getFieldDecorator('LastName')(
          <Input placeholder="Last Name" />
        )}
      </AdrFormItem>
      <AdrFormItem>
        {getFieldDecorator("FatherName")(
          <Input placeholder="Father's Name" />
        )}
      </AdrFormItem>

      <AdrFormItem>
        {getFieldDecorator('YearofBirth')(
          <Select options={YearsofBirth} placeholder="Year of Birth" />
        )}
      </AdrFormItem>
      <WeightAndHeight>
        <AdrFormItem>
          {getFieldDecorator('Weight')(
            <Select options={Weights} placeholder="Weight" />
          )}
        </AdrFormItem>
        <AdrFormItem>
          {getFieldDecorator('Height')(
            <Select options={Heights} placeholder="Height" />
          )}
        </AdrFormItem>
      </WeightAndHeight>
      <AdrFormItem>
        {getFieldDecorator('Gender', { rules: [{required: true}] })(
          <Radio label="Gender" options={[{ name: 'Male', value: true }, { name: 'Female', value: false }]} />
        )}
      </AdrFormItem>
      <AdrFormItem>
        {getFieldDecorator('PregnancyId')(
          <Radio
            label="Pregnancy Status:" 
            options={[{ name: 'Yes', value: 106 }, { name: 'No', value: 107 }, { name: 'Unknown', value: 108}]} 
          />
        )}
      </AdrFormItem>
      <AdrFormItem>
        {getFieldDecorator('MartialStatusId')(
          <Radio
            label="Marital Status:" 
            options={[{ name: 'Single', value: 134 }, { name: 'Married', value: 135 }]} 
          />
        )}
      </AdrFormItem>
      <Title>Further information</Title>
      <AdrFormItem>
        {getFieldDecorator('JobTitle')(
          <Input placeholder="Job Title" />
        )}
      </AdrFormItem>
      <AdrFormItem>
        {getFieldDecorator('PhoneNumber')(
          <Input placeholder="Phone Number" />
        )}
      </AdrFormItem>
      <AdrFormItem>
        {getFieldDecorator('Address')(
          <Input placeholder="Home Address" />
        )}
      </AdrFormItem>
      <ContinueButton isLoading={isSubmitting} onClick={submit} />
    </div>
  )
}


export default createForm({ name: 'AddAdrStepZeroForm' })(AddAdrStepZeroForm);
