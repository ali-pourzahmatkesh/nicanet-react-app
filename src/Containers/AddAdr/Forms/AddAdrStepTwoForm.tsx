import React, { useState } from 'react';
import { createForm } from 'rc-form';
import styled, { css } from 'styled-components';
import Select from 'components/Select/SelectComponent';
import AdrFormItem from './AdrFormItem';
import Radio, { RadioComponents as RC } from 'components/Radio/RadioComponent';
import Input from 'components/Input/InputComponent';
import {
  Title,
  PaddedWrapper,
  ErrorMesseage
} from 'Containers/AddCase/Components/Styled';
import ContinueButton from 'Containers/AddCase/Components/ContinueButton';
import Textarea from 'components/Textarea/TextareaComponent';
import DatePicker from 'components/DatePicker/DatePicker';
import AdrPhotoUploader from '../Components/AdrPhotoUploader';
import useApiConfig from 'Hooks/UseApiConfig';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    width: 40%;

    input {
      width: 100%;
      padding: 0;
      padding-bottom: 0.5rem;
    }
  }
`;

const RadioDynamicOptionsActiveStyle = css`
  &:before {
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    content: '';
    cursor: not-allowed;
  }
`;

const RadioDynamicOptions = styled.div<{ isActive?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  &:after {
    content: '';
    width: 1rem;
    height: 2.8rem;
    border-bottom: 1px solid #eee;
    border-left: 1px solid #eee;
    position: absolute;
    left: 0.5rem;
    top: 1rem;
  }
  ${props => props.isActive === false && RadioDynamicOptionsActiveStyle};
`;

const RadioErrorMesseage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const Separtor = styled.div`
  width: 100%;
  height: 1px;
  background-color: #666;
  margin-bottom: 1.5rem;
`;

interface AddAdrStepOneFormProps {
  form: any;
  onSubmit: (values: any) => Promise<any>;
}

function AddAdrStepOneForm(props: AddAdrStepOneFormProps) {
  const {
    form: { getFieldDecorator, validateFields, getFieldError, getFieldsValue },
    onSubmit
  } = props;

  const durations = useApiConfig(60);
  const outComes = useApiConfig(74);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [OccurrencedPlaceId, setOccurrencedPlaceId] = useState<
    number | undefined
  >(undefined);
  const [HospitalizationStatusId, setHospitalizationStatusId] = useState<
    number | undefined
  >(undefined);
  const [CutEffectId, setCutEffectId] = useState<number | undefined>(undefined);
  const [CutEffectIdError, setCutEffectIdError] = useState<string>('');
  const [ReuseEffectId, setReuseEffectId] = useState<number | undefined>(
    undefined
  );
  const [ReuseEffectIdError, setReuseEffectIdError] = useState<string>('');
  const [TreatmentDone, setTreatmentDone] = useState<boolean | undefined>(
    undefined
  );
  const [TreatmentDoneError, setTreatmentDoneError] = useState<string>('');

  const submit = () => {
    validateFields(async (error: any, values: any) => {
      if (!values.DateOnset) {
        let DateOnsetSection = document.getElementById('dateOnset');
        if (DateOnsetSection) {
          DateOnsetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
      if (!CutEffectId) {
        setCutEffectIdError('please select');
        let CutEffectIdSection = document.getElementById('cutEffectId');
        if (CutEffectIdSection) {
          CutEffectIdSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
      if (!ReuseEffectId) setReuseEffectIdError('please select');
      if (TreatmentDone !== true && TreatmentDone !== false)
        setTreatmentDoneError('please select');

      if (
        error !== null ||
        !CutEffectId ||
        !ReuseEffectId ||
        (TreatmentDone !== true && TreatmentDone !== false)
      )
        return;
      try {
        setIsSubmitting(true);
        await onSubmit({
          ...values,
          OccurrencedPlaceId,
          HospitalizationStatusId,
          CutEffectId,
          ReuseEffectId,
          TreatmentDone
        });
      } catch (_) {
        setIsSubmitting(false);
      }
    });
  };

  const formValues = getFieldsValue();

  return (
    <div>
      <Title>The Adverse Drug Reaction:</Title>
      <AdrFormItem>
        <div id="dateOnset">
          {getFieldDecorator('DateOnset', {
            rules: [
              {
                required: true,
                message: 'The Adverse Drug Reaction is required'
              }
            ]
          })(<DatePicker placeholder="Date of Onset" id="AddAdrStepOneForm" />)}
          {getFieldError('DateOnset') && (
            <ErrorMesseage>
              {getFieldError('DateOnset').join(', ')}
            </ErrorMesseage>
          )}
        </div>
      </AdrFormItem>
      <Row>
        <AdrFormItem>
          {getFieldDecorator('Duration')(
            <Input placeholder="Duration" type="number" />
          )}
        </AdrFormItem>
        <AdrFormItem>
          {getFieldDecorator('DurationUnitId')(
            <Select options={durations} placeholder="Day" />
          )}
        </AdrFormItem>
      </Row>

      <Title>Severity and patient management when ADR occurred:</Title>

      <AdrFormItem>
        {getFieldDecorator('LifeThreatening')(
          <Radio
            label="Life Threatening:"
            options={[
              { name: 'No', value: false },
              { name: 'Yes', value: true }
            ]}
          />
        )}
      </AdrFormItem>

      <AdrFormItem>
        <PaddedWrapper>
          <RC.Option onClick={() => setOccurrencedPlaceId(70)}>
            <RC.OptionCircleWrapper>
              <RC.OptionCircle isChecked={OccurrencedPlaceId === 70} />
            </RC.OptionCircleWrapper>
            <RC.OptionLabel>Outpatient</RC.OptionLabel>
          </RC.Option>

          <RadioDynamicOptions isActive={OccurrencedPlaceId === 70}>
            <AdrFormItem>
              <RC.Option onClick={() => setHospitalizationStatusId(72)}>
                <RC.OptionCircleWrapper>
                  <RC.OptionCircle isChecked={HospitalizationStatusId === 72} />
                </RC.OptionCircleWrapper>
                <RC.OptionLabel>Hospitalisation not required</RC.OptionLabel>
              </RC.Option>
            </AdrFormItem>

            <RC.Option onClick={() => setHospitalizationStatusId(73)}>
              <RC.OptionCircleWrapper>
                <RC.OptionCircle isChecked={HospitalizationStatusId === 73} />
              </RC.OptionCircleWrapper>
              <RC.OptionLabel>Hospitalisation</RC.OptionLabel>
            </RC.Option>
          </RadioDynamicOptions>

          <AdrFormItem>
            <RC.Option onClick={() => setOccurrencedPlaceId(69)}>
              <RC.OptionCircleWrapper>
                <RC.OptionCircle isChecked={OccurrencedPlaceId === 69} />
              </RC.OptionCircleWrapper>
              <RC.OptionLabel>Inpatient</RC.OptionLabel>
            </RC.Option>
          </AdrFormItem>
        </PaddedWrapper>
      </AdrFormItem>

      <Title>Laboratory and imaging results:</Title>
      <PaddedWrapper>
        <AdrFormItem>
          <AdrPhotoUploader presetName="Laboratory" />
        </AdrFormItem>
      </PaddedWrapper>

      <Separtor />

      <PaddedWrapper>
        <AdrFormItem>
          {getFieldDecorator('OutcomeId')(
            <Select options={outComes} placeholder="Outcome" />
          )}
        </AdrFormItem>
      </PaddedWrapper>

      {formValues.OutcomeId === '75' ||
      formValues.OutcomeId === '76' ||
      formValues.OutcomeId === '78' ||
      formValues.OutcomeId === '166' ||
      formValues.OutcomeId === '169' ? (
        <div>
          <Title>If fatal, indicate the Date of Death:</Title>
          <PaddedWrapper>
            <AdrFormItem>
              {getFieldDecorator('DateDeath')(
                <DatePicker
                  placeholder="Date of Death"
                  id="AddAdrStepOneForm-DateDeath"
                />
              )}
            </AdrFormItem>
          </PaddedWrapper>
        </div>
      ) : null}

      {formValues.OutcomeId === '168' ||
      formValues.OutcomeId === '166' ||
      formValues.OutcomeId === '169' ? (
        <div>
          <Title>If recovered, indicate the Date of Recovery:</Title>
          <PaddedWrapper>
            <AdrFormItem>
              {getFieldDecorator('RecoveryDate')(
                <DatePicker
                  placeholder="Date of Recovery"
                  id="AddAdrStepOneForm-RecoveryDate"
                />
              )}
            </AdrFormItem>
          </PaddedWrapper>
        </div>
      ) : null}

      <Title>Description of ADR:</Title>
      <PaddedWrapper>
        <AdrFormItem>
          {getFieldDecorator('AdrDescription')(
            <Textarea placeholder="Description (Max 250 Character)" />
          )}
        </AdrFormItem>
      </PaddedWrapper>

      <Title>Upload relevant images (if its available):</Title>
      <PaddedWrapper>
        <AdrFormItem>
          <AdrPhotoUploader presetName="Relevant" />
        </AdrFormItem>
      </PaddedWrapper>

      <Separtor />
      <div id="cutEffectId">
        <Title>Does it decrease by stop using medicine?</Title>
        <PaddedWrapper>
          <AdrFormItem>
            <RC.Option
              onClick={() => {
                setCutEffectId(81);
                setCutEffectIdError('');
              }}
            >
              <RC.OptionCircleWrapper>
                <RC.OptionCircle isChecked={CutEffectId === 81} />
              </RC.OptionCircleWrapper>
              <RC.OptionLabel>Yes</RC.OptionLabel>
            </RC.Option>
          </AdrFormItem>
          <AdrFormItem>
            <RC.Option
              onClick={() => {
                setCutEffectId(82);
                setCutEffectIdError('');
              }}
            >
              <RC.OptionCircleWrapper>
                <RC.OptionCircle isChecked={CutEffectId === 82} />
              </RC.OptionCircleWrapper>
              <RC.OptionLabel>No</RC.OptionLabel>
            </RC.Option>
          </AdrFormItem>
          <AdrFormItem>
            <RC.Option
              onClick={() => {
                setCutEffectId(83);
                setCutEffectIdError('');
              }}
            >
              <RC.OptionCircleWrapper>
                <RC.OptionCircle isChecked={CutEffectId === 83} />
              </RC.OptionCircleWrapper>
              <RC.OptionLabel>Not stopped</RC.OptionLabel>
            </RC.Option>
          </AdrFormItem>
          {CutEffectIdError && (
            <RadioErrorMesseage>{CutEffectIdError}</RadioErrorMesseage>
          )}
        </PaddedWrapper>
      </div>

      <Separtor />
      <Title>Does it reappear after using it again?</Title>
      <PaddedWrapper>
        <AdrFormItem>
          <RC.Option
            onClick={() => {
              setReuseEffectId(85);
              setReuseEffectIdError('');
            }}
          >
            <RC.OptionCircleWrapper>
              <RC.OptionCircle isChecked={ReuseEffectId === 85} />
            </RC.OptionCircleWrapper>
            <RC.OptionLabel>Yes</RC.OptionLabel>
          </RC.Option>
        </AdrFormItem>
        <AdrFormItem>
          <RC.Option
            onClick={() => {
              setReuseEffectId(86);
              setReuseEffectIdError('');
            }}
          >
            <RC.OptionCircleWrapper>
              <RC.OptionCircle isChecked={ReuseEffectId === 86} />
            </RC.OptionCircleWrapper>
            <RC.OptionLabel>No</RC.OptionLabel>
          </RC.Option>
        </AdrFormItem>
        <AdrFormItem>
          <RC.Option
            onClick={() => {
              setReuseEffectId(88);
              setReuseEffectIdError('');
            }}
          >
            <RC.OptionCircleWrapper>
              <RC.OptionCircle isChecked={ReuseEffectId === 88} />
            </RC.OptionCircleWrapper>
            <RC.OptionLabel>Did not use again</RC.OptionLabel>
          </RC.Option>
        </AdrFormItem>
        {ReuseEffectIdError && (
          <RadioErrorMesseage>{ReuseEffectIdError}</RadioErrorMesseage>
        )}
      </PaddedWrapper>

      <Separtor />
      <Title>Treatment for ADR:</Title>
      <PaddedWrapper>
        <AdrFormItem>
          <RC.Option
            onClick={() => {
              setTreatmentDone(true);
              setTreatmentDoneError('');
            }}
          >
            <RC.OptionCircleWrapper>
              <RC.OptionCircle isChecked={TreatmentDone === true} />
            </RC.OptionCircleWrapper>
            <RC.OptionLabel>Yes</RC.OptionLabel>
          </RC.Option>
        </AdrFormItem>
        <AdrFormItem>
          <RC.Option
            onClick={() => {
              setTreatmentDone(false);
              setTreatmentDoneError('');
            }}
          >
            <RC.OptionCircleWrapper>
              <RC.OptionCircle isChecked={TreatmentDone === false} />
            </RC.OptionCircleWrapper>
            <RC.OptionLabel>No</RC.OptionLabel>
          </RC.Option>
        </AdrFormItem>
        {TreatmentDoneError && (
          <RadioErrorMesseage>{TreatmentDoneError}</RadioErrorMesseage>
        )}

        <AdrFormItem>
          {getFieldDecorator('TreatmentDescription')(
            <Textarea placeholder="Details (including dosage, frequency, route, duration)" />
          )}
        </AdrFormItem>
      </PaddedWrapper>

      <ContinueButton isLoading={isSubmitting} onClick={submit} />
    </div>
  );
}

export default createForm({ name: 'AddAdrStepOneForm' })(AddAdrStepOneForm);
