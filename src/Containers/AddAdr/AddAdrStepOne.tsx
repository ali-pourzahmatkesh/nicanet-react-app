import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import AddAdrStepOneForm from './Forms/AddAdrStepOneForm';
import { RouteComponentProps } from 'react-router';
import { ADD_ADR_STEP_TWO_ROUTE } from 'router/RouterConstants';
import Heading from 'Containers/AddCase/Components/Heading';
import { AdrApi } from 'Api/AdrApi';

const Container = styled.div`
  padding: 0 1rem;
`

const AddAdrStepOne: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = async (values: any) => {
    const adrDataRow = localStorage.getItem('current_adr')
    if (adrDataRow === null) return
    const { AdrId, PatientId } = JSON.parse(adrDataRow)

    const data = {
      AdrId,
      PatientId,
      StatusId: 1,
      HabitualHistories: [],
      PastMedicalHistories: [],
      AdrPastTypeId: values.AdrPastTypeId,
      AdrPastHistories: [],
      GeneticDisease: values.GeneticDisease,
    }
    const keys = Object.keys(values)

    keys.filter(key => key.startsWith('habitualHistory_check')).forEach(habitualHistoryKey => {
      const habitualHistoryValue = values[habitualHistoryKey]
      const habitualHistoryValueKeyId = habitualHistoryKey.split('_').pop()
      const habitualHistoryUsageKey: string = `habitualHistory_usage_${habitualHistoryValueKeyId}`
      const habitualHistoryDurationKey: string = `habitualHistory_duration_${habitualHistoryValueKeyId}`

      if (habitualHistoryValue && values[habitualHistoryUsageKey] && values[habitualHistoryDurationKey]) {
        (data.HabitualHistories as any).push({
          HabitualTypeId: Number(habitualHistoryValueKeyId),
          DailyUsage: values[habitualHistoryUsageKey],
          Duration: values[habitualHistoryDurationKey],
        })
      }
    })

    Object.keys(values).filter(key => key.startsWith('pastMedicalHistory_')).forEach(pastMedicalHistory => {
      if (values[pastMedicalHistory]) {
        (data.PastMedicalHistories as any).push({
          DiseaseId: Number(pastMedicalHistory.split('_').pop()),
        })
      }
    })

    Object.keys(values).filter(key => key.startsWith('PastHistory_Date_')).forEach(dateKey => {
      const dateValue = values[dateKey]
      const historyIndex = dateKey.split('_').pop()
      const descValue = values[`PastHistory_Desc_${historyIndex}`]
      
      if (dateValue && descValue) {
        (data.AdrPastHistories as any).push({
          AdrTitle: descValue,
          Date: dateValue,
        })
      }
    })

    const { status } = await AdrApi.updateAdr(data)
    if (status !== 204) throw status
    props.history.push(ADD_ADR_STEP_TWO_ROUTE)
  }

  const goForward = () => props.history.push(ADD_ADR_STEP_TWO_ROUTE)

  return (
    <Layout noHeader>
      <Container>
        <Heading title="ADR" subtitle="1/4" onGoForward={goForward} />
        <AddAdrStepOneForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddAdrStepOne
