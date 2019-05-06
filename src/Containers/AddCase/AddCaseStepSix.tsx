import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import ContinueButton from './Components/ContinueButton';
import { RouteComponentProps } from 'react-router';
import { ADD_CASE_STEP_FIVE_ROUTE, HOME_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import AddCaseStepSixForm from './Forms/AddCaseStepSixForm';

const Container = styled.div`
  padding: 0 1rem;
`

const AddCaseStepSix: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = () => {
    props.history.push(ADD_CASE_STEP_FIVE_ROUTE)
  }

  const goForward = () => {
    props.history.push(HOME_ROUTE)    
  }

  return (
    <Layout>
      <Container>
        <Heading title="Lab Test and Imaging" subtitle="6/6" onGoForward={goForward} />
        <AddCaseStepSixForm />
        <ContinueButton onClick={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddCaseStepSix
