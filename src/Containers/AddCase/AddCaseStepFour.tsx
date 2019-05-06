import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import ContinueButton from './Components/ContinueButton';
import { RouteComponentProps } from 'react-router';
import { ADD_CASE_STEP_THREE_ROUTE, ADD_CASE_STEP_FIVE_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import AddCaseStepFourForm from './Forms/AddCaseStepFourForm';

const Container = styled.div`
  padding: 0 1rem;
`

const AddCaseStepFour: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = () => {
    props.history.push(ADD_CASE_STEP_FIVE_ROUTE)
  }

  const goToStepThree = () => {
    props.history.push(ADD_CASE_STEP_THREE_ROUTE)    
  }

  const goToStepFive = () => {
    props.history.push(ADD_CASE_STEP_FIVE_ROUTE)    
  }

  return (
    <Layout>
      <Container>
        <Heading title="ROS and Ph/E" subtitle="4/6" onGoBack={goToStepThree} onGoForward={goToStepFive} />
        <AddCaseStepFourForm />
        <ContinueButton onClick={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddCaseStepFour
