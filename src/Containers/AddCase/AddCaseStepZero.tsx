import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import AddCaseStepZeroForm from './Forms/AddCaseStepZeroForm';
import { RouteComponentProps } from 'react-router';
import { ADD_CASE_STEP_ONE_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import { CaseApi } from 'Api/CaseApi';

const Container = styled.div`
  padding: 0 1rem;
`

const AddCaseStepZero: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = async (values: any) => {
    const { status, data } = await CaseApi.addNewCase(values)
    if (status !== 200) throw status
    const { CaseId, PatientId } = data

    localStorage.setItem('current_case', JSON.stringify({ CaseId, PatientId }))
    props.history.push(ADD_CASE_STEP_ONE_ROUTE)
  }

  return (
    <Layout noHeader>
      <Container>
        <Heading title="Case Report" subtitle="Patient Information" />
        <AddCaseStepZeroForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddCaseStepZero

// === page 1
// // pregnant type
// yes = 106
// no = 107
// unknown = 108

// // maried
// single = 134
// maried = 136

// {
//   "GradeId":125,
//   "MartialStatusId":134,
//   "YearofBirth":"1375",
//   "Weight":80,
//   "Height":180,
//   "Gender":0,
//   "PregnancyId":105,
//   "JobTitle":"Designer",
//   "CurrentResidence":"Tehran",
//   "Originaly":"Tehran", // not in design Originally
//   "Nationality" "",
// } => patient id

// === page 2
