import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { ADD_CASE_STEP_THREE_ROUTE, ADD_CASE_STEP_FIVE_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import AddCaseStepFourForm from './Forms/AddCaseStepFourForm';
import { CaseApi } from 'Api/CaseApi';

const Container = styled.div`
  padding: 0 1rem;
`

const AddCaseStepFour: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = async (values: any) => {
    const currentCaseRaw = localStorage.getItem('current_case')
    if (currentCaseRaw === null) return
    const { CaseId } = JSON.parse(currentCaseRaw)

    const data = {
      StatusId: 4,
      CaseId,
      SignSymptoms: [],
    }

    const keys = Object.keys(values)

    keys.filter(key => key.startsWith('disease_')).forEach(diseaseKey => {
      if (values[diseaseKey] !== undefined) {
        
        if (typeof values[diseaseKey] === 'string') {
          (data.SignSymptoms as any).push({
            DiseaseId: Number(diseaseKey.split('_').pop()),
            Value: true,
            Note: values[diseaseKey],
          })
        } else {
          (data.SignSymptoms as any).push({
            DiseaseId: Number(diseaseKey.split('_').pop()),
            Value: values[diseaseKey]
          })
        }
      }
    })

    const { status } = await CaseApi.updateCase(data)
    if (status !== 204) throw status
    props.history.push(ADD_CASE_STEP_FIVE_ROUTE)
  }

  const goToStepThree = () => {
    props.history.push(ADD_CASE_STEP_THREE_ROUTE)    
  }

  const goToStepFive = () => {
    props.history.push(ADD_CASE_STEP_FIVE_ROUTE)    
  }

  return (
    <Layout noHeader>
      <Container>
        <Heading title="ROS and Ph/E" subtitle="4/6" onGoBack={goToStepThree} onGoForward={goToStepFive} />
        <AddCaseStepFourForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddCaseStepFour
