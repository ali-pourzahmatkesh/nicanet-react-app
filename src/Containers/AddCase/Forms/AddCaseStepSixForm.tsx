import React, { useState, useEffect } from 'react';
import { createForm } from 'rc-form';
import styled from 'styled-components';
import Select from 'react-select';
import CaseFormItem from './CaseFormItem';
import Textarea from 'components/Textarea/TextareaComponent';
import addIconSvg from 'Assets/addIcon.svg';
import { Title, PaddedWrapper } from '../Components/Styled';
import AddDrugForm from './AddDrugForm';
import Drug from '../Components/Drug';
import ContinueButton from '../Components/ContinueButton';
import { CaseApi } from 'Api/CaseApi';
import { getCase, setCase } from '../../../utils/utils';

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

interface AddCaseStepSixFormProps {
  form: any;
  onSubmit: (values: any) => Promise<any>;
  caseId: string;
}

function AddCaseStepSixForm(props: AddCaseStepSixFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caseDrugs, setCaseDrugs] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [diagnosisCount, setDiagnosisCount] = useState<number[]>([0]);
  const [prescriptionsCount, setPrescriptionsCount] = useState<number[]>([0]);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

  const {
    form: { getFieldDecorator, validateFields, setFieldsValue },
    onSubmit,
    caseId
  } = props;

  useEffect(() => {
    const effect = async () => {
      const oldValues = await getCase(caseId);
      if (oldValues.diagnosisCount) {
        setDiagnosisCount(oldValues.diagnosisCount);
      }

      if (oldValues.prescriptionsCount) {
        setDiagnosisCount(oldValues.prescriptionsCount);
      }

      if (oldValues.PrescriptionDrugs) {
        setCaseDrugs(oldValues.PrescriptionDrugs);
      }

      setFieldsValue(oldValues);
    };
    effect();
  }, [setFieldsValue, caseId]);

  const submit = () => {
    validateFields(async (error: any, values: any) => {
      if (error !== null) return;
      try {
        setIsSubmitting(true);
        await onSubmit({
          ...values,
          selectedTags: selectedTags.map((tag: any) => tag.value).join(','),
          PrescriptionDrugs: caseDrugs
        });
      } catch (_) {
        setIsSubmitting(false);
      }
    });
  };

  useEffect(() => {
    const effect = async () => {
      const response = await CaseApi.getTags();
      if (response.status !== 200) return;
      setTags(
        response.data.map((tag: any) => ({
          label: tag.TagTitle,
          value: tag.TagId
        }))
      );
    };
    effect();
  }, []);

  console.log('diagnosisCount', diagnosisCount);

  return (
    <div>
      <Title>Diagnosis (DX):</Title>
      <PaddedWrapper>
        {diagnosisCount.map((item: number) => (
          <CaseFormItem key={item.toString()}>
            {getFieldDecorator(`Diagnoses_${item}`)(
              <Textarea placeholder="Write your Diagnosis" />
            )}
          </CaseFormItem>
        ))}

        <AddWrapper
          onClick={() => {
            setDiagnosisCount(prev => [...prev, prev.length]);
            setCase(caseId, {
              diagnosisCount: [...diagnosisCount, diagnosisCount.length]
            });
          }}
        >
          <AddIcon src={addIconSvg} />
          Add DX
        </AddWrapper>
      </PaddedWrapper>
      <Title>Prescription (RX):</Title>
      <PaddedWrapper>
        {prescriptionsCount.map((item: number) => (
          <CaseFormItem key={item.toString()}>
            {getFieldDecorator(`Prescriptions_${item}`)(
              <Textarea placeholder="Write your Prescription" />
            )}
          </CaseFormItem>
        ))}

        <AddWrapper
          onClick={() => {
            setPrescriptionsCount(prev => [...prev, prev.length]);
            setCase(caseId, {
              prescriptionsCount: [
                ...prescriptionsCount,
                prescriptionsCount.length
              ]
            });
          }}
        >
          <AddIcon src={addIconSvg} />
          Add Order
        </AddWrapper>
      </PaddedWrapper>
      <CaseFormItem>
        <AddDrugForm
          onSubmit={(drug: any) =>
            setCaseDrugs(prevDrugs => [...prevDrugs, { ...drug, TypeId: 408 }])
          }
        />
      </CaseFormItem>

      {caseDrugs.map(drug => (
        <Drug
          key={drug.DrugName}
          title={drug.DrugName}
          subtitle={drug.Manufacture}
        />
      ))}

      <CaseFormItem>
        <Select
          isMulti
          options={tags}
          placeholder="Select tags"
          onChange={(data: any) => setSelectedTags(data)}
        />
      </CaseFormItem>

      <CaseFormItem>
        <ContinueButton isLoading={isSubmitting} onClick={submit} />
      </CaseFormItem>
    </div>
  );
}

export default createForm({ name: 'AddCaseStepSixForm' })(AddCaseStepSixForm);
