import React from 'react';
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import Heading from './Components/Heading';
import AddCaseStepOneForm from './Forms/AddCaseStepOneForm';
import { CaseApi } from 'Api/CaseApi';
import { setCase } from '../../utils/utils';

const Container = styled.div`
  padding: 0 1rem;
`;

const AddCaseStepOne: React.FC<RouteComponentProps<{ caseId: '' }>> = props => {
  const { match } = props;
  const { params } = match;
  const { caseId } = params;

  const onSubmit = async (values: any) => {
    const data = {
      CaseId: caseId,
      StatusId: 1,
      ChiefComplaint: values.ChiefComplaint,
      BloodPressure: values.BloodPressureOne
        ? `${values.BloodPressureOne}${values.BloodPressureTwo ? '/' : ''}${
            values.BloodPressureTwo
          }`
        : '',
      PulseRate: values.PulseRate,
      RespiratoryRate: values.RespiratoryRate,
      Temprature: values.TempratureOne
        ? `${values.TempratureOne}${values.TempratureTwo ? '.' : ''}${
            values.TempratureTwo
          }`
        : 0,
      PiNote: values.PiNote,
      GaNote: values.GaNote,
      PatientSigns: []
    };

    Object.keys(values)
      .filter(key => key.startsWith('SymptomId'))
      .forEach(SymptomId => {
        if (values[SymptomId]) {
          (data.PatientSigns as any).push({
            SymptomId: SymptomId.split('_').pop(),
            ResultValue: values[SymptomId]
          });
        }
      });
    const { status } = await CaseApi.updateCase(data);
    if (status !== 204) throw status;
    await setCase(caseId, values);
    props.history.push(`/add-case-step-two/${caseId}`);
  };

  const goToStepTwo = () => {
    props.history.push(`/add-case-step-two/${caseId}`);
  };

  const goToStepZero = () => {
    props.history.push(`/add-case-step-zero/${caseId}`);
  };

  return (
    <Layout noHeader>
      <Container>
        <Heading
          title="Case Report"
          subtitle="1/6"
          onGoForward={goToStepTwo}
          onGoBack={goToStepZero}
        />
        <AddCaseStepOneForm onSubmit={onSubmit} caseId={caseId} />
      </Container>
    </Layout>
  );
};

export default AddCaseStepOne;
