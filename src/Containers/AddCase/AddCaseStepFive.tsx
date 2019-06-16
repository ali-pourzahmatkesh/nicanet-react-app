import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import Heading from './Components/Heading';
import AddCaseStepFiveFormOne from './Forms/AddCaseStepFiveFormOne';
import AddCaseStepFiveFormTwo from './Forms/AddCaseStepFiveFormTwo';
import MultiButton from 'components/MultiButton/MultiButton';
import ContinueButton from './Components/ContinueButton';
import { CaseApi } from 'Api/CaseApi';
import { setCase, getCase } from '../../utils/utils';

const Container = styled.div`
  padding: 0 1rem;
`;

const ContinueButtonWrapper = styled.div`
  margin-top: 1rem;
`;

async function getFormOneValues(caseId: string) {
  const values = await getCase(caseId);

  const nextData = {
    BloodBank: {
      BloodGroupId:
        values.BloodGroupId !== undefined ? +values.BloodGroupId : undefined,
      RH: values.RH !== undefined ? +values.RH : undefined,
      CrossMatch: values.CrossMatch,
      BloodBankNote: values.BloodBankNote
    },
    Examinations: []
  };

  const keys = Object.keys(values);
  keys
    .filter(key => key.startsWith('ExaminationValue_'))
    .forEach(examinationValueKey => {
      const ExaminationTypeId = Number(examinationValueKey.split('_').pop());
      const examinationValue = values[examinationValueKey];
      const examinationValueUnitId =
        values[`Unit_ExaminationValue_${ExaminationTypeId}`];

      if (examinationValue === undefined) return;
      if (examinationValueUnitId === undefined) return;

      (nextData.Examinations as any).push({
        ExaminationTypeId,
        Note: '',
        ExaminationValue: examinationValue,
        UnitId: +examinationValueUnitId
      });
    });

  keys
    .filter(key => key.startsWith('Note_ExaminationValue_'))
    .forEach(examinationValueKey => {
      const ExaminationTypeId = Number(examinationValueKey.split('_').pop());
      const noteValue = values[examinationValueKey];

      if (noteValue === undefined) return;

      (nextData.Examinations as any).push({
        ExaminationTypeId,
        Note: noteValue,
        ExaminationValue: '',
        UnitId: 0
      });
    });

  return nextData;
}

async function getFormTwoValues(caseId: string) {
  const values = await getCase(caseId);
  const keys = Object.keys(values);

  const nextData = {
    ImagingDescription: []
  };

  keys
    .filter(key => key.startsWith('DescriptionTypeId_'))
    .forEach(description => {
      const DescriptionTypeId = Number(description.split('_').pop());
      const Description = values[description];

      if (Description === undefined) return;

      (nextData.ImagingDescription as any).push({
        DescriptionTypeId,
        Description
      });
    });

  return nextData;
}

const AddCaseStepFive: React.FC<
  RouteComponentProps<{ caseId: '' }>
> = props => {
  const { match } = props;
  const { params } = match;
  const { caseId } = params;

  const [activeTabName, setActiveTabName] = useState('Lab Test');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formOneValues = await getFormOneValues(caseId);
      const formTwoValues = await getFormTwoValues(caseId);
      const data = {
        StatusId: 5,
        CaseId: caseId,
        ...formOneValues,
        ...formTwoValues
      };

      const { status } = await CaseApi.updateCase(data);
      if (status !== 204) throw status;
      await setCase(caseId, {
        ...formOneValues,
        ...formTwoValues
      });
      props.history.push(`/add-case-step-six/${caseId}`);
    } catch (_) {
      setIsSubmitting(false);
    }
  };

  const goToStepFour = () => {
    props.history.push(`/add-case-step-four/${caseId}`);
  };

  const goToStepSix = () => {
    props.history.push(`/add-case-step-six/${caseId}`);
  };

  return (
    <Layout noHeader>
      <Container>
        <Heading
          title="Lab Test and Imaging"
          subtitle="5/6"
          onGoBack={goToStepFour}
          onGoForward={goToStepSix}
        />
        <MultiButton
          activeItemName={activeTabName}
          items={[
            { name: 'Lab Test', onClick: () => setActiveTabName('Lab Test') },
            { name: 'Imaging', onClick: () => setActiveTabName('Imaging') }
          ]}
        />
        {activeTabName === 'Lab Test' && (
          <AddCaseStepFiveFormOne caseId={caseId} />
        )}
        {activeTabName === 'Imaging' && (
          <AddCaseStepFiveFormTwo caseId={caseId} />
        )}
        <ContinueButtonWrapper>
          <ContinueButton isLoading={isSubmitting} onClick={onSubmit} />
        </ContinueButtonWrapper>
      </Container>
    </Layout>
  );
};

export default AddCaseStepFive;
