import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import ContinueButton from './Components/ContinueButton';
import { RouteComponentProps } from 'react-router';
import { ADD_CASE_STEP_TWO_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import AddCaseStepOneForm from './Forms/AddCaseStepOneForm';

const Container = styled.div`
  padding: 0 1rem;
`

const AddCaseStepOne: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = () => {
    props.history.push(ADD_CASE_STEP_TWO_ROUTE)
  }

  const goToStepTwo = () => {
    props.history.push(ADD_CASE_STEP_TWO_ROUTE)    
  }

  return (
    <Layout>
      <Container>
        <Heading title="Case Report" subtitle="1/6" onGoForward={goToStepTwo} />
        <AddCaseStepOneForm />
        <ContinueButton onClick={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddCaseStepOne
