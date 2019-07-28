import React, { useState } from 'react';
import { createForm } from 'rc-form';
import AdrFormItem from './AdrFormItem';
import { Title } from 'Containers/AddCase/Components/Styled';
import ContinueButton from 'Containers/AddCase/Components/ContinueButton';
import AddDrugForm from './AddDrugForm';
import Drug from 'Containers/AddCase/Components/Drug';

interface AddAdrStepFourFormProps {
  form: any;
  onSubmit: (values: any) => Promise<any>;
}

function AddAdrStepFourForm(props: AddAdrStepFourFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adrDrugs, setadrDrugs] = useState<any[]>([]);

  const {
    form: { validateFields },
    onSubmit
  } = props;

  const submit = () => {
    validateFields(async (error: any, values: any) => {
      if (error !== null) return;
      try {
        setIsSubmitting(true);
        await onSubmit({ adrDrugs });
      } catch (_) {
        setIsSubmitting(false);
      }
    });
  };

  const onDelete = (DrugId: number) => {
    setadrDrugs(adrDrugs.filter(item => item.DrugId !== DrugId));
  };

  return (
    <div>
      <Title>
        Concomitant drug details (Minimom of one entry is required):
      </Title>
      <AdrFormItem>
        <AddDrugForm
          placeholder="Concomitant Drug"
          onSubmit={(drug: any) =>
            setadrDrugs(prevDrugs => [...prevDrugs, { ...drug, TypeId: 111 }])
          }
        />
      </AdrFormItem>
      {adrDrugs.map(drug => (
        <AdrFormItem>
          <Drug
            key={drug.DrugName}
            title={drug.DrugName}
            subtitle={drug.Manufacture}
            onDelete={() => {
              onDelete(drug.DrugId);
            }}
          />
        </AdrFormItem>
      ))}
      <ContinueButton isLoading={isSubmitting} onClick={submit} />
    </div>
  );
}

export default createForm({ name: 'AddAdrStepFourForm' })(AddAdrStepFourForm);
