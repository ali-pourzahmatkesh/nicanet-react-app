import React, { useState, useEffect } from 'react'
import { createForm } from 'rc-form';
import styled from 'styled-components';
import Select from 'components/Select/SelectComponent';
import AdrFormItem from './AdrFormItem';
import Radio from 'components/Radio/RadioComponent';
import Input from 'components/Input/InputComponent';
import { Title } from 'Containers/AddCase/Components/Styled';
import ContinueButton from 'Containers/AddCase/Components/ContinueButton';
import AddDrugForm from './AddDrugForm';
import Drug from 'Containers/AddCase/Components/Drug';

interface AddAdrStepThreeFormProps {
  form: any
  onSubmit: (values: any) => Promise<any>
}

function AddAdrStepThreeForm(props: AddAdrStepThreeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [adrDrugs, setadrDrugs] = useState<any[]>([])

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
        await onSubmit({ adrDrugs })
      } catch (_) {
        setIsSubmitting(false)
      }
    });
  }

  return (
    <div>
      <Title>Suspected drug details (Minimum of one entry is required):</Title>
      <AdrFormItem>
        <AddDrugForm placeholder="Suspected Drug" onSubmit={(drug: any) => setadrDrugs(prevDrugs => [...prevDrugs, { ...drug, TypeId: 110 }])} />
      </AdrFormItem>
      {
        adrDrugs.map(drug => <AdrFormItem><Drug key={drug.DrugName} title={drug.DrugName} subtitle={drug.Manufacture} /></AdrFormItem>)
      }
      <ContinueButton isLoading={isSubmitting} onClick={submit} />
    </div>
  )
}


export default createForm({ name: 'AddAdrStepThreeForm' })(AddAdrStepThreeForm);
