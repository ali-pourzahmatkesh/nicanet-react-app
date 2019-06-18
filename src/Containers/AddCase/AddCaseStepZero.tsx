import React from 'react';
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import AddCaseStepZeroForm from './Forms/AddCaseStepZeroForm';
import { RouteComponentProps } from 'react-router';
import Heading from './Components/Heading';
import { CaseApi } from 'Api/CaseApi';
import { getCase, setCase } from '../../utils/utils';

const Container = styled.div`
  padding: 0 1rem;
`;

const AddCaseStepZero: React.FC<
  RouteComponentProps<{ caseId: '' }>
> = props => {
  const { match } = props;
  const { params } = match;
  const { caseId } = params;

  const onSubmit = async (values: any) => {
    try {
      if (caseId) {
        const currentCase = await getCase(caseId);
        const params = {
          ...values,
          patientId: currentCase.PatientId
        };

        const { status } = await CaseApi.updatePatient(params);
        if (status !== 204) throw status;
        await setCase(caseId, values);
        props.history.push(`/add-case-step-one/${caseId}`);
      } else {
        const { status, data } = await CaseApi.addNewCase(values);
        if (status !== 200) throw status;
        const { CaseId, PatientId } = data;
        const params = { ...values, PatientId, CaseId };
        await setCase(CaseId, params);
        props.history.push(`/add-case-step-one/${CaseId}`);
      }
    } catch (_) {}
  };

  return (
    <Layout noHeader>
      <Container>
        <Heading title="Case Report" subtitle="Patient Information" />
        <AddCaseStepZeroForm onSubmit={onSubmit} caseId={caseId} />
      </Container>
    </Layout>
  );
};

export default AddCaseStepZero;
