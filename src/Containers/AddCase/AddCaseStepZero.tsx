import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import HeaderComponent from 'components/Header/HeaderComponent';
import AddCaseStepZeroForm from './Forms/AddCaseStepZeroForm';

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding-bottom: 1rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid #979797;
`

const Title = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #000000;
`

const SubTitle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: #212121;
`

const Container = styled.div`
  padding: 0 1rem;
`



function AddCaseStepZero() {
  return (
    <Layout>
      <HeaderComponent />
      <Container>
        <Heading>
          <Title>Case Report</Title>
          <SubTitle>Patient Information</SubTitle>
        </Heading>
        <AddCaseStepZeroForm />
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
