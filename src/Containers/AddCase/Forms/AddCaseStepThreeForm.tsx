import React, { useState, useEffect, Fragment } from 'react';
import { createForm } from 'rc-form';
import CaseFormItem from './CaseFormItem';
import Textarea from 'components/Textarea/TextareaComponent';
import { Title, PaddedWrapper } from '../Components/Styled';
import CheckBox from 'components/CheckBox/CheckBoxComponent';
import Input from 'components/Input/InputComponent';
import AddDrugForm from './AddDrugForm';
import ContinueButton from '../Components/ContinueButton';
import Drug from '../Components/Drug';
import { ConfigApi } from 'Api/ConfigApi';
import { getCase } from '../../../utils/utils';
import DetectLanguage from '../../../components/DetectLanguage/DetectLanguageComponent';

interface AddCaseStepThreeFormProps {
  form: any;
  onSubmit: (values: any) => Promise<any>;
  caseId: string;
}

function AddCaseStepThreeForm(props: AddCaseStepThreeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caseDrugs, setCaseDrugs] = useState<any[]>([]);
  const [habitualHistories, setHabitualHistories] = useState<any[]>([]);
  const [herbalHistories, setHerbalHistories] = useState<any[]>([]);

  const {
    form: {
      getFieldDecorator,
      validateFields,
      getFieldValue,
      setFieldsValue,
      getFieldsValue
    },
    onSubmit,
    caseId
  } = props;
  const formValues = getFieldsValue();

  const submit = () => {
    validateFields(async (error: any, values: any) => {
      if (error !== null) return;
      try {
        setIsSubmitting(true);
        await onSubmit({
          ...values,
          CaseDrugs: caseDrugs
        });
      } catch (_) {
        setIsSubmitting(false);
      }
    });
  };

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
      const response = await ConfigApi.getConfig(357);
      if (response.status !== 200) return;
      setHerbalHistories(
        response.data.map((herbalHistory: any) => ({
          value: herbalHistory.ConfigId,
          name: herbalHistory.ConfigName
        }))
      );
    };
    effect();
  }, []);

  useEffect(() => {
    const effect = async () => {
      const oldValues = await getCase(caseId);
      setFieldsValue(oldValues);
      if (!oldValues.CaseDrugs) return;
      setCaseDrugs(oldValues.CaseDrugs);
    };
    effect();
  }, [setFieldsValue, habitualHistories, herbalHistories, caseId]);

  const onDelete = (DrugId: number) => {
    setCaseDrugs(caseDrugs.filter(item => item.DrugId !== DrugId));
  };

  const dhDrugs = caseDrugs.filter(drug => drug.TypeId === 350);
  const otcDrugs = caseDrugs.filter(drug => drug.TypeId === 351);

  return (
    <div>
      <Title>Drug History (DH):</Title>
      <PaddedWrapper>
        <CaseFormItem>
          <AddDrugForm
            onSubmit={(drug: any) =>
              setCaseDrugs(prevDrugs => [
                ...prevDrugs,
                { ...drug, TypeId: 350 }
              ])
            }
          />
        </CaseFormItem>
        {dhDrugs.map((drug, index) => (
          <Drug
            key={drug.DrugName}
            title={drug.DrugName}
            subtitle={drug.Manufacture}
            onDelete={() => {
              onDelete(drug.DrugId);
            }}
          />
        ))}
        <CaseFormItem>
          <DetectLanguage value={formValues.DhDrugNote}>
            {getFieldDecorator('DhDrugNote')(<Textarea placeholder="Note" />)}
          </DetectLanguage>
        </CaseFormItem>
      </PaddedWrapper>
      <Title>Over The Counter Drugs (OTC):</Title>
      <PaddedWrapper>
        <CaseFormItem>
          <AddDrugForm
            onSubmit={(drug: any) =>
              setCaseDrugs(prevDrugs => [
                ...prevDrugs,
                { ...drug, TypeId: 351 }
              ])
            }
          />
        </CaseFormItem>
        {otcDrugs.map(drug => (
          <Drug
            key={drug.DrugName}
            title={drug.DrugName}
            subtitle={drug.Manufacture}
            onDelete={() => {
              onDelete(drug.DrugId);
            }}
          />
        ))}
        <CaseFormItem>
          <DetectLanguage value={formValues.OtcDrugNote}>
            {getFieldDecorator('OtcDrugNote')(<Textarea placeholder="Note" />)}
          </DetectLanguage>
        </CaseFormItem>
      </PaddedWrapper>

      <Title>Habitual History:</Title>
      <PaddedWrapper>
        {habitualHistories.map((habitualHistory: any) => {
          return (
            <Fragment key={habitualHistory.name}>
              {getFieldDecorator(
                `habitualHistory_check_${habitualHistory.value}`
              )(<CheckBox name={habitualHistory.name} />)}
              {getFieldValue(
                `habitualHistory_check_${habitualHistory.value}`
              ) && (
                <div>
                  {habitualHistory.name === 'Other' && (
                    <CaseFormItem>
                      <DetectLanguage value={formValues.Other_HabitualTitle}>
                        {getFieldDecorator('Other_HabitualTitle')(
                          <Textarea placeholder="Type of addiction and description" /> //
                        )}
                      </DetectLanguage>
                    </CaseFormItem>
                  )}
                  <CaseFormItem>
                    <DetectLanguage
                      value={
                        formValues[
                          `habitualHistory_usage_${habitualHistory.value}`
                        ]
                      }
                    >
                      {getFieldDecorator(
                        `habitualHistory_usage_${habitualHistory.value}`
                      )(<Input placeholder="Daily usage" />)}
                    </DetectLanguage>
                  </CaseFormItem>
                  <CaseFormItem>
                    <DetectLanguage
                      value={
                        formValues[
                          `habitualHistory_duration_${habitualHistory.value}`
                        ]
                      }
                    >
                      {getFieldDecorator(
                        `habitualHistory_duration_${habitualHistory.value}`
                      )(<Input placeholder="Duration" />)}
                    </DetectLanguage>
                  </CaseFormItem>
                </div>
              )}
            </Fragment>
          );
        })}
      </PaddedWrapper>

      <Title>Herbal History:</Title>
      <PaddedWrapper>
        {herbalHistories.map((herbalHistory: any) =>
          getFieldDecorator(`herbalHistory_${herbalHistory.value}`)(
            <CheckBox key={herbalHistory.name} name={herbalHistory.name} />
          )
        )}
      </PaddedWrapper>
      <ContinueButton isLoading={isSubmitting} onClick={submit} />
    </div>
  );
}

export default createForm({ name: 'AddCaseStepThreeForm' })(
  AddCaseStepThreeForm
);
