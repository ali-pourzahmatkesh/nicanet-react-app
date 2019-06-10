import React, { useState, useEffect } from 'react';
import { createForm } from 'rc-form';
import AdrFormItem from './AdrFormItem';
import { Title, ErrorMesseage } from 'Containers/AddCase/Components/Styled';
import ContinueButton from 'Containers/AddCase/Components/ContinueButton';
import AddDrugForm from './AddDrugForm';
import Drug from 'Containers/AddCase/Components/Drug';

interface AddAdrStepThreeFormProps {
  form: any;
  onSubmit: (values: any) => Promise<any>;
}

function AddAdrStepThreeForm(props: AddAdrStepThreeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adrDrugs, setadrDrugs] = useState<any[]>([]);
  const [adrDrugsError, setAdrDrugsError] = useState('');

  const {
    form: { getFieldDecorator, validateFields },
    onSubmit
  } = props;

  const submit = () => {
    validateFields(async (error: any, values: any) => {
      if (error !== null) return;
      try {
        setIsSubmitting(true);
        if (adrDrugs.length === 0) setAdrDrugsError('Please add drug');
        await onSubmit({ adrDrugs });
      } catch (_) {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div>
      <Title>Suspected drug details (Minimum of one entry is required):</Title>
      <AdrFormItem>
        <AddDrugForm
          placeholder="Suspected Drug"
          onSubmit={(drug: any) =>
            setadrDrugs(prevDrugs => [...prevDrugs, { ...drug, TypeId: 110 }])
          }
        />
        {adrDrugsError && adrDrugs.length === 0 && (
          <ErrorMesseage>{adrDrugsError}</ErrorMesseage>
        )}
      </AdrFormItem>
      {adrDrugs.map(drug => (
        <AdrFormItem>
          <Drug
            key={drug.DrugName}
            title={drug.DrugName}
            subtitle={drug.Manufacture}
          />
        </AdrFormItem>
      ))}

      <ContinueButton isLoading={isSubmitting} onClick={submit} />
    </div>
  );
}

export default createForm({ name: 'AddAdrStepThreeForm' })(AddAdrStepThreeForm);
