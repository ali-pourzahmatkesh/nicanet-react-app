import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import ContinueButton from './Components/ContinueButton';
import { RouteComponentProps } from 'react-router';
import { ADD_CASE_STEP_TWO_ROUTE, ADD_CASE_STEP_FOUR_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import AddCaseStepThreeForm from './Forms/AddCaseStepThreeForm';

const Container = styled.div`
  padding: 0 1rem;
`

const AddCaseStepThree: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = () => {
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
        <AddCaseStepThreeForm />
        <ContinueButton onClick={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddCaseStepThree
