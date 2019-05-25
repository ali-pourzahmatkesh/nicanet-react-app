import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import AddAdrStepThreeForm from './Forms/AddAdrStepThreeForm';
import { RouteComponentProps } from 'react-router';
import { ADD_ADR_STEP_FOUR_ROUTE, ADD_ADR_STEP_THREE_ROUTE } from 'router/RouterConstants';
import Heading from 'Containers/AddCase/Components/Heading';
import { AdrApi } from 'Api/AdrApi';

const Container = styled.div`
  padding: 0 1rem;
`

const AddAdrStepThree: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = async (values: any) => {
    const adrDataRow = localStorage.getItem('current_adr')
    if (adrDataRow === null) return
    const { AdrId } = JSON.parse(adrDataRow)

    const { adrDrugs } = values

    if (adrDrugs.length === 0) throw new Error('no drugs specifed')
    
    const addDrugQueue = adrDrugs.map(async (drug: any) => {
      await AdrApi.addDrug({ ...drug, AdrId })
    })

    await Promise.all(addDrugQueue)
    props.history.push(ADD_ADR_STEP_FOUR_ROUTE)
  }

  const goForward = () => props.history.push(ADD_ADR_STEP_FOUR_ROUTE)
  const goBackward = () => props.history.push(ADD_ADR_STEP_THREE_ROUTE)

  return (
    <Layout>
      <Container>
        <Heading title="ADR" subtitle="3/4" onGoBack={goBackward} onGoForward={goForward} />
        <AddAdrStepThreeForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddAdrStepThree
