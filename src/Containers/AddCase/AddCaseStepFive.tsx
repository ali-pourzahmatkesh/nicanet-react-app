import React, { useState } from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import ContinueButton from './Components/ContinueButton';
import { RouteComponentProps } from 'react-router';
import { ADD_CASE_STEP_SIX_ROUTE, ADD_CASE_STEP_FOUR_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import AddCaseStepFiveFormOne from './Forms/AddCaseStepFiveFormOne';
import AddCaseStepFiveFormTwo from './Forms/AddCaseStepFiveFormTwo';
import MultiButton from 'components/MultiButton/MultiButton';

const Container = styled.div`
  padding: 0 1rem;
`

const AddCaseStepFive: React.FC<RouteComponentProps<{}>> = (props) => {
  const [activeTabName, setActiveTabName] = useState('Lab Test')

  const onSubmit = () => {
    props.history.push(ADD_CASE_STEP_SIX_ROUTE)
  }

  const goToStepFour = () => {
    props.history.push(ADD_CASE_STEP_FOUR_ROUTE)
  }

  const goToStepSix = () => {
    props.history.push(ADD_CASE_STEP_SIX_ROUTE)    
  }

  return (
    <Layout>
      <Container>
        <Heading title="Lab Test and Imaging" subtitle="5/6" onGoBack={goToStepFour} onGoForward={goToStepSix} />
        <MultiButton
          activeItemName={activeTabName}
          items={[
            { name: 'Lab Test', onClick: () => setActiveTabName('Lab Test') },
            { name: 'Imaging', onClick: () => setActiveTabName('Imaging') },
          ]}
        />
        {
          activeTabName === 'Lab Test' &&
          <AddCaseStepFiveFormOne />
        }
        {
          activeTabName === 'Imaging' &&
          <AddCaseStepFiveFormTwo />
        }
        <ContinueButton onClick={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddCaseStepFive
