import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import AddAdrStepTwoForm from './Forms/AddAdrStepTwoForm';
import { RouteComponentProps } from 'react-router';
import { ADD_ADR_STEP_ONE_ROUTE, ADD_ADR_STEP_THREE_ROUTE } from 'router/RouterConstants';
import Heading from 'Containers/AddCase/Components/Heading';
import { AdrApi } from 'Api/AdrApi';

const Container = styled.div`
  padding: 0 1rem;
`

const AddAdrStepTwo: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = async (values: any) => {
    const adrDataRow = localStorage.getItem('current_adr')
    if (adrDataRow === null) return
    const { AdrId, PatientId } = JSON.parse(adrDataRow)

    const data = {
      AdrId,
      PatientId,
      StatusId: 2,
      ...values,
    }

    const { status } = await AdrApi.updateAdr(data)
    if (status !== 204) throw status
    props.history.push(ADD_ADR_STEP_THREE_ROUTE)
  }

  const goForward = () => props.history.push(ADD_ADR_STEP_THREE_ROUTE)
  const goBackward = () => props.history.push(ADD_ADR_STEP_ONE_ROUTE)

  return (
    <Layout noHeader>
      <Container>
        <Heading title="ADR" subtitle="2/4" onGoBack={goBackward} onGoForward={goForward} />
        <AddAdrStepTwoForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddAdrStepTwo
