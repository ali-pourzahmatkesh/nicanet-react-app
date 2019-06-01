import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { ADD_CASE_STEP_FIVE_ROUTE, HOME_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import AddCaseStepSixForm from './Forms/AddCaseStepSixForm';
import { CaseApi } from 'Api/CaseApi';

const Container = styled.div`
  padding: 0 1rem;
`

const AddCaseStepSix: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = async (values: any) => {
    const currentCaseRaw = localStorage.getItem('current_case')
    if (currentCaseRaw === null) return
    const { CaseId } = JSON.parse(currentCaseRaw)

    const data = {
      StatusId: 6,
      CaseId,
      Diagnoses: [],
      PrescriptionDrugs: values.CaseDrugs,
      Tags: values.selectedTags,
    }

    const keys = Object.keys(values)

    keys.filter(key => key.startsWith('Diagnoses_')).forEach(diagnose => {
      const value = values[diagnose]
      if (value === undefined) return

      (data.Diagnoses as any).push({
        Description: value,
        TypeId: 407,
      })
    })
    
    keys.filter(key => key.startsWith('Prescriptions_')).forEach(prescription => {
      const value = values[prescription]
      if (value === undefined) return

      (data.PrescriptionDrugs as any).push({
        DrugId: 0,
        // PersonId: 1004,
        TypeId: 0,
        FrequencyId: 0,
        RouteId: 0,
        Manufacture: "",
        BatchNo: "",
        Description: value
      })
    })

    const { status } = await CaseApi.updateCase(data)
    if (status !== 204) throw status
    props.history.push(HOME_ROUTE)
  }

  const goForward = () => {
    props.history.push(HOME_ROUTE)
  }

  const goBackward = () => {
    props.history.push(ADD_CASE_STEP_FIVE_ROUTE)    
  }

  return (
    <Layout>
      <Container>
        <Heading title="Lab Test and Imaging" subtitle="6/6" onGoBack={goBackward} onGoForward={goForward} />
        <AddCaseStepSixForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddCaseStepSix
