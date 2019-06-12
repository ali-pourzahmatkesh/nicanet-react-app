import React, { useState, useEffect } from 'react';
import { createForm } from 'rc-form';
import CaseFormItem from './CaseFormItem';
import Textarea from 'components/Textarea/TextareaComponent';
import {
  Title,
  PaddedWrapper,
  FormRow,
  FromCol,
  ErrorMesseage
} from '../Components/Styled';
import Radio from 'components/Radio/RadioComponent';
import Select from 'components/Select/SelectComponent';
import ContinueButton from '../Components/ContinueButton';
import CasePhotoUploader from '../Components/CasePhotoUploader';
import { CaseApi } from 'Api/CaseApi';

interface AddCaseStepOneFormProps {
  form: any;
  onSubmit: (values: any) => Promise<any>;
}

const BloodPressureRates = [
  { name: '0', value: '0' },
  { name: '5', value: '5' },
  { name: '10', value: '10' },
  { name: '15', value: '15' },
  { name: '20', value: '20' },
  { name: '25', value: '25' },
  { name: '30', value: '30' },
  { name: '35', value: '35' },
  { name: '40', value: '40' },
  { name: '45', value: '45' },
  { name: '50', value: '50' },
  { name: '55', value: '55' },
  { name: '60', value: '60' },
  { name: '65', value: '65' },
  { name: '70', value: '70' },
  { name: '75', value: '75' },
  { name: '80', value: '80' },
  { name: '85', value: '85' },
  { name: '90', value: '90' },
  { name: '95', value: '95' },
  { name: '100', value: '100' },
  { name: '105', value: '105' },
  { name: '110', value: '110' },
  { name: '115', value: '115' },
  { name: '120', value: '120' },
  { name: '125', value: '125' },
  { name: '130', value: '130' },
  { name: '135', value: '135' },
  { name: '140', value: '140' },
  { name: '145', value: '145' },
  { name: '150', value: '150' },
  { name: '155', value: '155' },
  { name: '160', value: '160' },
  { name: '165', value: '165' },
  { name: '170', value: '170' },
  { name: '175', value: '175' },
  { name: '180', value: '180' },
  { name: '185', value: '185' },
  { name: '190', value: '190' },
  { name: '195', value: '195' },
  { name: '200', value: '200' },
  { name: '205', value: '205' },
  { name: '210', value: '210' },
  { name: '215', value: '215' },
  { name: '220', value: '220' },
  { name: '225', value: '225' },
  { name: '230', value: '230' },
  { name: '235', value: '235' },
  { name: '240', value: '240' },
  { name: '245', value: '245' },
  { name: '250', value: '250' },
  { name: '255', value: '255' },
  { name: '260', value: '260' },
  { name: '265', value: '265' },
  { name: '270', value: '270' },
  { name: '275', value: '275' },
  { name: '280', value: '280' },
  { name: '285', value: '285' },
  { name: '290', value: '290' },
  { name: '295', value: '295' },
  { name: '300', value: '300' },
  { name: '305', value: '305' },
  { name: '310', value: '310' },
  { name: '315', value: '315' },
  { name: '320', value: '320' },
  { name: '325', value: '325' },
  { name: '330', value: '330' },
  { name: '335', value: '335' },
  { name: '340', value: '340' },
  { name: '345', value: '345' },
  { name: '350', value: '350' },
  { name: '355', value: '355' },
  { name: '360', value: '360' },
  { name: '365', value: '365' },
  { name: '370', value: '370' },
  { name: '375', value: '375' },
  { name: '380', value: '380' },
  { name: '385', value: '385' },
  { name: '390', value: '390' },
  { name: '395', value: '395' },
  { name: '400', value: '400' }
];

const TempratureOne = new Array(50).fill(null).map((item, index) => {
  const rate = Math.abs(index - 50);
  return { value: rate.toString(), name: rate.toString() };
});

const TempratureTwo = new Array(10).fill(null).map((item, index) => {
  const rate = Math.abs(index - 9);
  return {
    value: rate.toString(),
    name: rate.toString()
  };
});

const respiratoryRates = new Array(60).fill(null).map((item, index) => {
  const rate = Math.abs(index - 60);
  return { value: rate.toString(), name: rate.toString() };
});

const pulseRateValues = new Array(137).fill(null).map((item, index) => {
  // const rate = index < 16 ? Math.abs(500 - index * 20) : Math.abs(230 - index*2);
  const rate =
    index > 130
      ? Math.abs(680 - index * 5)
      : index > 115
      ? Math.abs(290 - index * 2)
      : index > 55
      ? Math.abs(175 - index)
      : index > 15
      ? Math.abs(230 - index * 2)
      : Math.abs(500 - index * 20);
  return { value: rate.toString(), name: rate.toString() };
});

function AddCaseStepOneForm(props: AddCaseStepOneFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [presentIllnesses, setPresentIllnesses] = useState<any[]>([]);
  const [generalAppearances, setGeneralAppearances] = useState<any[]>([]);
  const {
    form: { getFieldDecorator, validateFields, getFieldError },
    onSubmit
  } = props;

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await CaseApi.getSymptoms();
        if (response.status !== 200) setTimeout(() => effect(), 3000);

        setPresentIllnesses(
          response.data.filter((symptom: any) => symptom.CategoryId === 122)
        );
        setGeneralAppearances(
          response.data.filter((symptom: any) => symptom.CategoryId === 123)
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

  return (
    <div>
      <Title>Chief Complaint (CC):</Title>
      <CaseFormItem>
        {getFieldDecorator('ChiefComplaint', {
          rules: [{ required: true, message: 'Chief Complaint is required' }]
        })(<Textarea placeholder="Write Description" />)}
        {getFieldError('ChiefComplaint') && (
          <ErrorMesseage>
            {getFieldError('ChiefComplaint').join(', ')}
          </ErrorMesseage>
        )}
      </CaseFormItem>
      <CasePhotoUploader presetName="ChiefComplaint" />

      <Title>Present Illness (PI):</Title>
      <PaddedWrapper>
        {presentIllnesses.map((symptom: any) => (
          <CaseFormItem key={symptom.Title}>
            {getFieldDecorator(`SymptomId_${symptom.SymptomId}`)(
              <Radio
                label={symptom.Title}
                options={[
                  { name: 'Yes', value: 'Yes' },
                  { name: 'No', value: 'No' }
                ]}
              />
            )}
          </CaseFormItem>
        ))}

        <CaseFormItem>
          {getFieldDecorator('PiNote')(<Textarea placeholder="Note" />)}
        </CaseFormItem>
      </PaddedWrapper>

      <Title>General Appearance (GA):</Title>
      <PaddedWrapper>
        {generalAppearances.map((symptom: any) => (
          <CaseFormItem key={symptom.Title}>
            {getFieldDecorator(`SymptomId_${symptom.SymptomId}`)(
              <Radio
                label={symptom.Title}
                options={[
                  { name: 'Yes', value: 'Yes' },
                  { name: 'No', value: 'No' }
                ]}
              />
            )}
          </CaseFormItem>
        ))}
        <CaseFormItem>
          {getFieldDecorator('GaNote')(<Textarea placeholder="Note" />)}
        </CaseFormItem>
      </PaddedWrapper>

      <Title>Vital Sign (VS):</Title>
      <CaseFormItem>
        <FromCol>
          <Title>Blood Pressure (E.g: 120/80):</Title>
        </FromCol>
        <FormRow>
          <FromCol>
            {getFieldDecorator('BloodPressureOne', {initialValue: '120' })(
              <Select options={BloodPressureRates} />
            )}
          </FromCol>
          <FromCol>
            {getFieldDecorator('BloodPressureTwo', { initialValue: '80' })(
              <Select options={BloodPressureRates} />
            )}
          </FromCol>
        </FormRow>
      </CaseFormItem>

      <CaseFormItem>
        <FromCol>
          <Title>Tempreture (E.g: 37.0):</Title>
        </FromCol>
        <FormRow>
          <FromCol>
            {getFieldDecorator('TempratureOne',{ initialValue: '37' })(
              <Select options={TempratureOne} />
            )}
          </FromCol>
          <FromCol>
            {getFieldDecorator('TempratureTwo', { initialValue: '0' })(
              <Select options={TempratureTwo} />
            )}
          </FromCol>
        </FormRow>
      </CaseFormItem>

      <CaseFormItem>
        <FromCol>
          <Title>Pulse Rate:</Title>
        </FromCol>

        <FormRow>
          <FromCol>
            {getFieldDecorator('PulseRate', { initialValue: '75' })(
              <Select options={pulseRateValues} />
            )}
          </FromCol>
        </FormRow>
      </CaseFormItem>

      <CaseFormItem>
        <FromCol>
          <Title>Respiratory Rate:</Title>
        </FromCol>
        <FormRow>
          <FromCol>
            {getFieldDecorator('RespiratoryRate', { initialValue: '12' })(
              <Select options={respiratoryRates} />
            )}
          </FromCol>
        </FormRow>
      </CaseFormItem>
      <ContinueButton isLoading={isSubmitting} onClick={submit} />
    </div>
  );
}

export default createForm({ name: 'AddCaseStepOneForm' })(AddCaseStepOneForm);
