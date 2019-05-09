import React, { useState, useEffect, Fragment } from 'react'
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

interface AddCaseStepThreeFormProps {
  form: any
  onSubmit: (values: any) => Promise<any>
}

function AddCaseStepThreeForm(props: AddCaseStepThreeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [caseDrugs, setCaseDrugs] = useState<any[]>([])
  const [habitualHistories, setHabitualHistories] = useState<any[]>([])
  const [herbalHistories, setHerbalHistories] = useState<any[]>([])

  const {
    form: {
      getFieldDecorator,
      validateFields,
    },
    onSubmit,
  } = props;
  
  const submit = () => {
    validateFields(async (error: any, values: any) => {
      if (error !== null) return
      try {
        setIsSubmitting(true)
        await onSubmit({ ...values, CaseDrugs: caseDrugs.map(drug => ({ ...drug, DrugName: undefined }))})
      } catch (_) {
        setIsSubmitting(false)
      }
    });
  }

  useEffect(() => {
    const effect = async () => {
      const response = await ConfigApi.getConfig(98)
      if (response.status !== 200) return
      setHabitualHistories(response.data.map((habitualHistory: any) => ({ value: habitualHistory.ConfigId, name: habitualHistory.ConfigName })))
    }
    effect()
  }, [])

  useEffect(() => {
    const effect = async () => {
      const response = await ConfigApi.getConfig(357)
      if (response.status !== 200) return
      setHerbalHistories(response.data.map((herbalHistory: any) => ({ value: herbalHistory.ConfigId, name: herbalHistory.ConfigName })))
    }
    effect()
  }, [])

  const dhDrugs = caseDrugs.filter(drug => drug.TypeId === 350)
  const otcDrugs = caseDrugs.filter(drug => drug.TypeId === 351)

  return (
    <div>
      <Title>Drug History (DH):</Title>
      <PaddedWrapper>
        <CaseFormItem>
          <AddDrugForm onSubmit={(drug: any) => setCaseDrugs(prevDrugs => [...prevDrugs, { ...drug, TypeId: 350 }])} />
        </CaseFormItem>
        {
          dhDrugs.map(drug => <Drug key={drug.DrugName} title={drug.DrugName} subtitle={drug.Manufacture} />)
        }
        <CaseFormItem>
          {getFieldDecorator('DhDrugNote')(
            <Textarea placeholder="Note" />
          )}
        </CaseFormItem>
      </PaddedWrapper>
      <Title>Over The Counter Drugs (OTC):</Title>
      <PaddedWrapper>
        <CaseFormItem>
          <AddDrugForm onSubmit={(drug: any) => setCaseDrugs(prevDrugs => [...prevDrugs, { ...drug, TypeId: 351 }])} />
        </CaseFormItem>
        {
          otcDrugs.map(drug => <Drug key={drug.DrugName} title={drug.DrugName} subtitle={drug.Manufacture} />)
        }
        <CaseFormItem>
          {getFieldDecorator('OtcDrugNote')(
            <Textarea placeholder="Note" />
          )}
        </CaseFormItem>
      </PaddedWrapper>

      <Title>Habitual History:</Title>
      <PaddedWrapper>
        {
          habitualHistories.map((habitualHistory: any) => (
            <Fragment key={habitualHistory.name}>
              {getFieldDecorator(`habitualHistory_check_${habitualHistory.value}`)(
                <CheckBox name={habitualHistory.name} />
              )}
              {
                habitualHistory.name === 'Other' &&
                <CaseFormItem>
                  {getFieldDecorator('Other_HabitualTitle')(
                    <Textarea placeholder="Type of addiction and description" /> // 
                  )}
                </CaseFormItem>
              }
              <CaseFormItem>
                {getFieldDecorator(`habitualHistory_usage_${habitualHistory.value}`)(
                  <Input placeholder="Daily usage" />
                )}
              </CaseFormItem>
              <CaseFormItem>
                {getFieldDecorator(`habitualHistory_duration_${habitualHistory.value}`)(
                  <Input placeholder="Duration" />
                )}
              </CaseFormItem>
            </Fragment>
          ))
        }
      </PaddedWrapper>

      <Title>Herbal History:</Title>
      <PaddedWrapper>
        {
          herbalHistories.map((herbalHistory: any) => (
            getFieldDecorator(`herbalHistory_${herbalHistory.value}`)(
              <CheckBox key={herbalHistory.name} name={herbalHistory.name} />
            )
          ))
        }
      </PaddedWrapper>
      <ContinueButton isLoading={isSubmitting} onClick={submit} />
    </div>
  )
}


export default createForm({ name: 'AddCaseStepThreeForm' })(AddCaseStepThreeForm);
