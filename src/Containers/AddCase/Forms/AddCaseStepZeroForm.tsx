import React from 'react'
import { createForm } from 'rc-form';
import styled from 'styled-components';
import Select from 'components/Select/SelectComponent';
import CaseFormItem from './CaseFormItem';

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
  const onSelect = console.log
  const {
    getFieldDecorator
  } = props.form;

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
    </div>
  )
}


export default createForm({ name: 'AddCaseStepZeroForm' })(AddCaseStepZeroForm);
