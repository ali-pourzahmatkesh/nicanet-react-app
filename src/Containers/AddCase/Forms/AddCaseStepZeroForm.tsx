import React, { useState, useEffect } from 'react'
import { createForm } from 'rc-form';
import styled from 'styled-components';
import Select, { SelectOption } from 'components/Select/SelectComponent';
import CaseFormItem from './CaseFormItem';
import Radio from 'components/Radio/RadioComponent';
import { ConfigApi } from 'Api/ConfigApi';
import Input from 'components/Input/InputComponent';
import { Title } from '../Components/Styled';

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

interface AddCaseStepZeroFormProps {
  form: any
}

function AddCaseStepZeroForm(props: AddCaseStepZeroFormProps) {
  const [educationDegrees, setEducationDegrees] = useState<SelectOption[]>([])
  const onSelect = console.log
  const {
    getFieldDecorator
  } = props.form;

  useEffect(() => {
    const effect = async () => {
      const response = await ConfigApi.getConfig(124)
      if (response.status === 200) {
        setEducationDegrees(response.data.map((ed: any) => ({ name: ed.ConfigName, value: ed.ConfigId })))
      }
    }
    effect()
  }, [])

  return (
    <div>
      <CaseFormItem>
        {getFieldDecorator('YearofBirth')(
          <Select options={YearsofBirth} placeholder="Year of Birth" />
        )}
      </CaseFormItem>
      <WeightAndHeight>
        <CaseFormItem>
          {getFieldDecorator('Weight')(
            <Select onChange={onSelect} options={Weights} placeholder="Weight" />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('Height')(
            <Select onChange={onSelect} options={Heights} placeholder="Height" />
          )}
        </CaseFormItem>
      </WeightAndHeight>
      <CaseFormItem>
        {getFieldDecorator('Gender')(
          <Radio label="Gender" options={[{ name: 'Male', value: 0 }, { name: 'Female', value: 1 }]} />
        )}
      </CaseFormItem>
      <CaseFormItem>
        {getFieldDecorator('PregnancyId')(
          <Radio
            label="Pregnancy Status:" 
            options={[{ name: 'Yes', value: 105 }, { name: 'No', value: 106 }, { name: 'Unknown', value: 107}]} 
          />
        )}
      </CaseFormItem>
      <CaseFormItem>
        {getFieldDecorator('MartialStatusId')(
          <Radio
            label="Marital Status:" 
            options={[{ name: 'Single', value: 134 }, { name: 'Married', value: 135 }]} 
          />
        )}
      </CaseFormItem>
      <Title>Further information</Title>
      <CaseFormItem>
        {getFieldDecorator('GradeId')(
          <Select options={educationDegrees} placeholder="Last Educational Degree" />
        )}
      </CaseFormItem>
      <CaseFormItem>
        {getFieldDecorator('JobTitle')(
          <Input placeholder="Job Title" />
        )}
      </CaseFormItem>
      <CaseFormItem>
        {getFieldDecorator('CurrentResidence')(
          <Input placeholder="Resident in" />
        )}
      </CaseFormItem>
      <CaseFormItem>
        {getFieldDecorator('Nationality')(
          <Input placeholder="Nationality" />
        )}
      </CaseFormItem>
      <CaseFormItem>
        {getFieldDecorator('Originaly')(
          <Input placeholder="Originally" />
        )}
      </CaseFormItem>
    </div>
  )
}


export default createForm({ name: 'AddCaseStepZeroForm' })(AddCaseStepZeroForm);
