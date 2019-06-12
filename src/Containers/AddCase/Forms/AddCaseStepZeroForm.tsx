import React, { useState, useEffect } from 'react';
import { createForm } from 'rc-form';
import styled from 'styled-components';
import Select, { SelectOption } from 'components/Select/SelectComponent';
import CaseFormItem from './CaseFormItem';
import Radio from 'components/Radio/RadioComponent';
import { ConfigApi } from 'Api/ConfigApi';
import Input from 'components/Input/InputComponent';
import { Title, ErrorMesseage } from '../Components/Styled';
import ContinueButton from '../Components/ContinueButton';

const WeightAndHeight = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    flex: 0.4;
  }
`;

const YearsofBirth = new Array(100)
  .fill(null)
  .map((item: any, index: number) => {
    const year = (1398 - index).toString();
    return { value: year, name: year };
  });

const Weights = new Array(200)
  .fill(null)
  .map((item, index) => {
    const weight = 200 - index;
    return { value: weight.toString(), name: `${weight} KG` };
  })
  .slice(0, -1);

const Heights = new Array(230)
  .fill(null)
  .map((item, index) => {
    const height = 230 - index;
    return { value: height.toString(), name: `${height} CM` };
  })
  .slice(0, -20);

interface AddCaseStepZeroFormProps {
  form: any;
  onSubmit: (values: any) => Promise<any>;
}

function AddCaseStepZeroForm(props: AddCaseStepZeroFormProps) {
  const [educationDegrees, setEducationDegrees] = useState<SelectOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSelect = console.log;
  const {
    form: { getFieldDecorator, validateFields, getFieldError, getFieldsValue },
    onSubmit
  } = props;

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
      const response = await ConfigApi.getConfig(124);
      if (response.status === 200) {
        setEducationDegrees(
          response.data.map((ed: any) => ({
            name: ed.ConfigName,
            value: ed.ConfigId
          }))
        );
      }
    };
    effect();
  }, []);

  const formValues = getFieldsValue();

  return (
    <div>
      <CaseFormItem>
        {getFieldDecorator('YearofBirth', {
          rules: [{ required: true, message: 'Year of Birth is required' }],
        })(<Select options={YearsofBirth} placeholder="Year of Birth" />)}
        {getFieldError('YearofBirth') && (
          <ErrorMesseage>
            {getFieldError('YearofBirth').join(', ')}
          </ErrorMesseage>
        )}
      </CaseFormItem>
      <WeightAndHeight>
        <CaseFormItem>
          {getFieldDecorator('Weight')(
            <Select
              onChange={onSelect}
              options={Weights}
              placeholder="Weight"
            />
          )}
        </CaseFormItem>
        <CaseFormItem>
          {getFieldDecorator('Height')(
            <Select
              onChange={onSelect}
              options={Heights}
              placeholder="Height"
            />
          )}
        </CaseFormItem>
      </WeightAndHeight>
      <CaseFormItem>
        {getFieldDecorator('Gender', { rules: [{ required: true }] })(
          <Radio
            label="Gender"
            options={[
              { name: 'Male', value: true },
              { name: 'Female', value: false }
            ]}
          />
        )}
        {getFieldError('Gender') && (
          <ErrorMesseage>{getFieldError('Gender').join(', ')}</ErrorMesseage>
        )}
      </CaseFormItem>

      {formValues.Gender === false && (
        <CaseFormItem>
          {getFieldDecorator('PregnancyId')(
            <Radio
              label="Pregnancy Status:"
              options={[
                { name: 'Yes', value: 106 },
                { name: 'No', value: 107 },
                { name: 'Unknown', value: 108 }
              ]}
            />
          )}
        </CaseFormItem>
      )}
      <CaseFormItem>
        {getFieldDecorator('MartialStatusId')(
          <Radio
            label="Marital Status:"
            options={[
              { name: 'Single', value: 134 },
              { name: 'Married', value: 136 }
            ]}
          />
        )}
      </CaseFormItem>
      <Title>Further information</Title>
      <CaseFormItem>
        {getFieldDecorator('GradeId')(
          <Select
            options={educationDegrees}
            placeholder="Last Educational Degree"
          />
        )}
      </CaseFormItem>
      <CaseFormItem>
        {getFieldDecorator('JobTitle')(<Input placeholder="Job Title" />)}
      </CaseFormItem>
      <CaseFormItem>
        {getFieldDecorator('Nationality')(<Input placeholder="Nationality" />)}
      </CaseFormItem>
      <CaseFormItem>
        {getFieldDecorator('CurrentResidence')(
          <Input placeholder="Resident in" />
        )}
      </CaseFormItem>
      <CaseFormItem>
        {getFieldDecorator('Originaly')(
          <Input placeholder="Originally from" />
        )}
      </CaseFormItem>
      <ContinueButton isLoading={isSubmitting} onClick={submit} />
    </div>
  );
}

export default createForm({ name: 'AddCaseStepZeroForm' })(AddCaseStepZeroForm);
