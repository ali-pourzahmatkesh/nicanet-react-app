import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import ContinueButton from './Components/ContinueButton';
import { RouteComponentProps } from 'react-router';
import { ADD_CASE_STEP_TWO_ROUTE, ADD_CASE_STEP_FOUR_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import AddCaseStepThreeForm from './Forms/AddCaseStepThreeForm';
import { CaseApi } from 'Api/CaseApi';

const Container = styled.div`
  padding: 0 1rem;
`

const AddCaseStepThree: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = async (values: any) => {
    const currentCaseRaw = localStorage.getItem('current_case')
    if (currentCaseRaw === null) return
    const { CaseId } = JSON.parse(currentCaseRaw)

    const data = {
      // CaseId,
      // StatusId: 2,
      // PastSurgicalHistory: values.PastSurgicalHistory,
      // FamilyHistory: values.FamilyHistory,
      // PastMedicalHistory: values.PastMedicalHistory,
      // PastMedicalHistories: [],
    }
    
    // Object.keys(values).filter(key => key.startsWith('disease')).forEach(disease => {
    //   if (values[disease]) {
    //     (data.PastMedicalHistories as any).push({
    //       DiseaseId: Number(disease.split('_').pop()),
    //     })
    //   }
    // })

    const { status } = await CaseApi.updateCase(data)
    if (status !== 204) throw status
    props.history.push(ADD_CASE_STEP_FOUR_ROUTE)
  }

  const goToStepThree = () => {
    props.history.push(ADD_CASE_STEP_FOUR_ROUTE)    
  }

  const goToStepOne = () => {
    props.history.push(ADD_CASE_STEP_TWO_ROUTE)    
  }

  return (
    <Layout>
      <Container>
        <Heading title="Case Report" subtitle="3/6" onGoBack={goToStepOne} onGoForward={goToStepThree} />
        <AddCaseStepThreeForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddCaseStepThree
