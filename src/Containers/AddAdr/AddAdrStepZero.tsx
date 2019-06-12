import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import AddAdrStepZeroForm from './Forms/AddAdrStepZeroForm';
import { RouteComponentProps } from 'react-router';
import { ADD_ADR_STEP_ONE_ROUTE } from 'router/RouterConstants';
import Heading from 'Containers/AddCase/Components/Heading';
import { AdrApi } from 'Api/AdrApi';

const Container = styled.div`
  padding: 0 1rem;
`

const AddAdrStepZero: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = async (values: any) => {
    const { status, data } = await AdrApi.addAdr(values)
    if (status !== 200) throw status
    const { AdrId, PatientId } = data

    localStorage.setItem('current_adr', JSON.stringify({ AdrId, PatientId }))
    props.history.push(ADD_ADR_STEP_ONE_ROUTE)
  }

  return (
    <Layout noHeader>
      <Container>
        <Heading title="ADR" subtitle="Patient Information" />
        <AddAdrStepZeroForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddAdrStepZero
