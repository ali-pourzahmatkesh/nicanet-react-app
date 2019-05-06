import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import ContinueButton from './Components/ContinueButton';
import { RouteComponentProps } from 'react-router';
import { ADD_CASE_STEP_ONE_ROUTE, ADD_CASE_STEP_THREE_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import AddCaseStepTwoForm from './Forms/AddCaseStepTwoForm';

const Container = styled.div`
  padding: 0 1rem;
`

const AddCaseStepTwo: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = () => {
    props.history.push(ADD_CASE_STEP_THREE_ROUTE)
  }

  const goToStepTwo = () => {
    props.history.push(ADD_CASE_STEP_THREE_ROUTE)    
  }

  const goToStepOne = () => {
    props.history.push(ADD_CASE_STEP_ONE_ROUTE)    
  }

  return (
    <Layout>
      <Container>
        <Heading title="Case Report" subtitle="2/6" onGoBack={goToStepOne} onGoForward={goToStepTwo} />
        <AddCaseStepTwoForm />
        <ContinueButton onClick={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddCaseStepTwo
