import React from 'react';
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import AddAdrStepFiveForm from './Forms/AddAdrStepFiveForm';
import { RouteComponentProps } from 'react-router';
import { ADD_ADR_STEP_FOUR_ROUTE, HOME_ROUTE } from 'router/RouterConstants';
import Heading from 'Containers/AddCase/Components/Heading';
import { AdrApi } from 'Api/AdrApi';
import { toast } from 'react-toastify';

const Container = styled.div`
  padding: 0 1rem;
`;

const AddAdrStepFive: React.FC<RouteComponentProps<{}>> = props => {
  const onSubmit = async (values: any) => {
    const adrDataRow = localStorage.getItem('current_adr');
    if (adrDataRow === null) return;
    const { AdrId, PatientId } = JSON.parse(adrDataRow);

    const data = {
      AdrId,
      PatientId,
      StatusId: 4,
      ...values
    };

    const { status } = await AdrApi.updateAdr(data);
    if (status !== 204) throw status;

    toast.success('Adr has been successfully published', {
      position: toast.POSITION.TOP_CENTER
    });
    setTimeout(() => {
      props.history.push(HOME_ROUTE);
    }, 4000);
  };

  const goBackward = () => props.history.push(ADD_ADR_STEP_FOUR_ROUTE);

  return (
    <Layout noHeader>
      <Container>
        <Heading
          title="ADR"
          subtitle="Final Explanation"
          onGoBack={goBackward}
        />
        <AddAdrStepFiveForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  );
};

export default AddAdrStepFive;
