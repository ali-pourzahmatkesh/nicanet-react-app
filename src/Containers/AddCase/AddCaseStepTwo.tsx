import React from 'react';
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import Heading from './Components/Heading';
import AddCaseStepTwoForm from './Forms/AddCaseStepTwoForm';
import { CaseApi } from 'Api/CaseApi';
import { setCase } from '../../utils/utils';

const Container = styled.div`
  padding: 0 1rem;
`;

const AddCaseStepTwo: React.FC<RouteComponentProps<{ caseId: '' }>> = props => {
  const { match } = props;
  const { params } = match;
  const { caseId } = params;

  const onSubmit = async (values: any) => {

    const data = {
      CaseId: caseId,
      StatusId: 2,
      PastSurgicalHistory: values.PastSurgicalHistory,
      FamilyHistory: values.FamilyHistory,
      PastMedicalHistory: values.PastMedicalHistory,
      PastMedicalHistories: []
    };

    Object.keys(values)
      .filter(key => key.startsWith('disease'))
      .forEach(disease => {
        if (values[disease]) {
          (data.PastMedicalHistories as any).push({
            DiseaseId: Number(disease.split('_').pop())
          });
        }
      });

    const { status } = await CaseApi.updateCase(data);
    if (status !== 204) throw status;
    await setCase(caseId, values);
    props.history.push(`/add-case-step-three/${caseId}`);
  };

  const goToStepTwo = () => {
    props.history.push(`/add-case-step-three/${caseId}`);
  };

  const goToStepOne = () => {
    props.history.push(`/add-case-step-one/${caseId}`);
  };

  return (
    <Layout noHeader>
      <Container>
        <Heading
          title="Case Report"
          subtitle="2/6"
          onGoBack={goToStepOne}
          onGoForward={goToStepTwo}
        />
        <AddCaseStepTwoForm onSubmit={onSubmit} caseId={caseId} />
      </Container>
    </Layout>
  );
};

export default AddCaseStepTwo;
