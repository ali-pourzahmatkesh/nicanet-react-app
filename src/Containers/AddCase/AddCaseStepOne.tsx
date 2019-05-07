import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { ADD_CASE_STEP_TWO_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import AddCaseStepOneForm from './Forms/AddCaseStepOneForm';
import { CaseApi } from 'Api/CaseApi';

const Container = styled.div`
  padding: 0 1rem;
`

const AddCaseStepOne: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = async (values: any) => {
    const currentCaseRaw = localStorage.getItem('current_case')
    if (currentCaseRaw === null) return
    const { CaseId } = JSON.parse(currentCaseRaw)

    const data = {
      CaseId,
      StatusId:1,
      ChiefComplaint: values.ChiefComplaint,
      BloodPressure: `${values.BloodPressureOne}/${values.BloodPressureTwo}`,
      PulseRate: values.PulseRate,
      RespiratoryRate: values.RespiratoryRate,
      Temprature: `${values.TempratureOne}/${values.TempratureTwo}`,
      PiNote: values.PiNote,
      GaNote: values.GaNote,
      PatientSigns: [],
    }
    
    Object.keys(values).filter(key => key.startsWith('SymptomId')).forEach(SymptomId => {
      if (values[SymptomId]) {
        (data.PatientSigns as any).push({
          SymptomId: SymptomId.split('_').pop(),
          ResultValue: values[SymptomId],
        })
      }
    })
    const { status } = await CaseApi.updateCase(data)
    if (status !== 204) throw status
    props.history.push(ADD_CASE_STEP_TWO_ROUTE)
  }

  const goToStepTwo = () => {
    props.history.push(ADD_CASE_STEP_TWO_ROUTE)    
  }

  return (
    <Layout>
      <Container>
        <Heading title="Case Report" subtitle="1/6" onGoForward={goToStepTwo} />
        <AddCaseStepOneForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddCaseStepOne
