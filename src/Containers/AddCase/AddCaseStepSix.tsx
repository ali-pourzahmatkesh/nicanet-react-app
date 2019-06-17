import React from 'react';
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { HOME_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import AddCaseStepSixForm from './Forms/AddCaseStepSixForm';
import { CaseApi } from 'Api/CaseApi';
import { toast } from 'react-toastify';
import { setCase } from '../../utils/utils';

const Container = styled.div`
  padding: 0 1rem;
`;

const AddCaseStepSix: React.FC<RouteComponentProps<{ caseId: '' }>> = props => {
  const { match } = props;
  const { params } = match;
  const { caseId } = params;

  const onSubmit = async (values: any) => {
    const data = {
      StatusId: 6,
      CaseId: caseId,
      Diagnoses: [],
      PrescriptionDrugs: values.PrescriptionDrugs,
      Tags: values.selectedTags.map((tag: any) => tag.value).join(',')
    };

    const keys = Object.keys(values);

    keys
      .filter(key => key.startsWith('Diagnoses_'))
      .forEach(diagnose => {
        const value = values[diagnose];
        if (value === undefined) return;

        (data.Diagnoses as any).push({
          Description: value,
          TypeId: 407
        });
      });

    keys
      .filter(key => key.startsWith('Prescriptions_'))
      .forEach(prescription => {
        const value = values[prescription];
        if (value === undefined) return;

        (data.PrescriptionDrugs as any).push({
          DrugId: 0,
          // PersonId: 1004,
          TypeId: 0,
          FrequencyId: 0,
          RouteId: 0,
          Manufacture: '',
          BatchNo: '',
          Description: value
        });
      });

    await setCase(caseId, values);
    const { status } = await CaseApi.updateCase(data);
    if (status !== 204) throw status;

    toast.success('Case has been successfully published', {
      position: toast.POSITION.TOP_CENTER
    });
    setTimeout(() => {
      localStorage.removeItem(`case_info_${caseId}`);

      props.history.push(HOME_ROUTE);
    }, 4000);
  };

  const goForward = () => {
    props.history.push(HOME_ROUTE);
  };

  const goBackward = () => {
    props.history.push(`/add-case-step-five/${caseId}`);
  };

  return (
    <Layout noHeader>
      <Container>
        <Heading
          title="Lab Test and Imaging"
          subtitle="6/6"
          onGoBack={goBackward}
          onGoForward={goForward}
        />
        <AddCaseStepSixForm onSubmit={onSubmit} caseId={caseId} />
      </Container>
    </Layout>
  );
};

export default AddCaseStepSix;
