import React, { useState, useEffect, Fragment } from 'react';
import { createForm } from 'rc-form';
import styled from 'styled-components';
import Select from 'components/Select/SelectComponent';
import AdrFormItem from './AdrFormItem';
import Radio from 'components/Radio/RadioComponent';
import Input from 'components/Input/InputComponent';
import {
  Title,
  PaddedWrapper,
  ErrorMesseage
} from 'Containers/AddCase/Components/Styled';
import ContinueButton from 'Containers/AddCase/Components/ContinueButton';
import { ConfigApi } from 'Api/ConfigApi';
import Textarea from 'components/Textarea/TextareaComponent';
import CheckBox from 'components/CheckBox/CheckBoxComponent';
import addIconSvg from 'Assets/addIcon.svg';
import DatePicker from 'components/DatePicker/DatePicker';

const AddWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  cursor: pointer;
`;

const AddIcon = styled.img`
  width: 1rem;
  height: 1rem;
`;

interface AddAdrStepOneFormProps {
  form: any;
  onSubmit: (values: any) => Promise<any>;
}

function AddAdrStepOneForm(props: AddAdrStepOneFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [habitualHistories, setHabitualHistories] = useState<any[]>([]);
  const [pastMedicalHistories, setPastMedicalHistories] = useState<any[]>([]);
  const [pastHistories, setPastHistories] = useState<number[]>([0]);

  const {
    form: {
      getFieldDecorator,
      validateFields,
      getFieldValue,
      getFieldError,
      getFieldsValue
    },
    onSubmit
  } = props;

  useEffect(() => {
    const effect = async () => {
      const response = await ConfigApi.getConfig(98);
      if (response.status !== 200) return;
      setHabitualHistories(
        response.data.map((habitualHistory: any) => ({
          value: habitualHistory.ConfigId,
          name: habitualHistory.ConfigName
        }))
      );
    };
    effect();
  }, []);

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

  const formValues = getFieldsValue();

  return (
    <div>
      <Title>Habitual History:</Title>
      <PaddedWrapper>
        {habitualHistories.map((habitualHistory: any) => (
          <Fragment key={habitualHistory.name}>
            {getFieldDecorator(
              `habitualHistory_check_${habitualHistory.value}`
            )(<CheckBox name={habitualHistory.name} />)}
            {getFieldValue(
              `habitualHistory_check_${habitualHistory.value}`
            ) && (
              <div>
                {habitualHistory.name === 'Other' && (
                  <AdrFormItem>
                    {getFieldDecorator('Other_HabitualTitle')(
                      <Textarea placeholder="Type of addiction and description" /> //
                    )}
                  </AdrFormItem>
                )}
                <AdrFormItem>
                  {getFieldDecorator(
                    `habitualHistory_usage_${habitualHistory.value}`
                  )(<Input placeholder="Daily usage" />)}
                </AdrFormItem>
                <AdrFormItem>
                  {getFieldDecorator(
                    `habitualHistory_duration_${habitualHistory.value}`
                  )(<Input placeholder="Duration" />)}
                </AdrFormItem>
              </div>
            )}
          </Fragment>
        ))}
      </PaddedWrapper>

      <Title>Past Medical History (PMH):</Title>
      <PaddedWrapper>
        {pastMedicalHistories.map((pastMedicalHistory: any) => (
          <div key={pastMedicalHistory.ConfigName}>
            {getFieldDecorator(
              `pastMedicalHistory_${pastMedicalHistory.ConfigId}`
            )(<CheckBox name={pastMedicalHistory.ConfigName} />)}
          </div>
        ))}
      </PaddedWrapper>

      <AdrFormItem>
        {getFieldDecorator('AdrPastTypeId', {
          rules: [{ required: true, message: 'ADR Past History is required' }]
        })(
          <Radio
            label="ADR Past History:"
            options={[
              { name: 'Yes', value: 56 },
              { name: 'No', value: 58 },
              { name: 'Unknown', value: 59 }
            ]}
          />
        )}
        {getFieldError('AdrPastTypeId') && (
          <ErrorMesseage>
            {getFieldError('AdrPastTypeId').join(', ')}
          </ErrorMesseage>
        )}
      </AdrFormItem>
      {formValues.AdrPastTypeId === 56 && (
        <PaddedWrapper>
          {pastHistories.map((item: number) => (
            <AdrFormItem key={item.toString()}>
              <AdrFormItem>
                {getFieldDecorator(`PastHistory_Date_${item}`)(
                  <DatePicker id={`PastHistory_Date_${item}`} />
                )}
              </AdrFormItem>
              <AdrFormItem>
                {getFieldDecorator(`PastHistory_Desc_${item}`)(
                  <Textarea placeholder="Description" />
                )}
              </AdrFormItem>
            </AdrFormItem>
          ))}
          <AddWrapper
            onClick={() => setPastHistories(prev => [...prev, prev.length])}
          >
            <AddIcon src={addIconSvg} />
            Add more history
          </AddWrapper>
        </PaddedWrapper>
      )}

      <Title>Genetic Disease:</Title>
      <PaddedWrapper>
        <AdrFormItem>
          {getFieldDecorator('GeneticDisease')(
            <Textarea placeholder="Description" />
          )}
        </AdrFormItem>
      </PaddedWrapper>

      <ContinueButton isLoading={isSubmitting} onClick={submit} />
    </div>
  );
}

export default createForm({ name: 'AddAdrStepOneForm' })(AddAdrStepOneForm);
