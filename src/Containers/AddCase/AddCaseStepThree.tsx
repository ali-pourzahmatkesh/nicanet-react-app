import React from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { ADD_CASE_STEP_TWO_ROUTE, ADD_CASE_STEP_FOUR_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import AddCaseStepThreeForm from './Forms/AddCaseStepThreeForm';
import { CaseApi } from 'Api/CaseApi';

const Container = styled.div`
  padding: 0 1rem;
`

const AddCaseStepThree: React.FC<RouteComponentProps<{}>> = (props) => {

  const onSubmit = async (values: any) => {
    const currentCaseRaw = localStorage.getItem('current_case')
    if (currentCaseRaw === null) return
    const { CaseId } = JSON.parse(currentCaseRaw)

    const data = {
      StatusId: 3,
      CaseId,
      CaseDrugs: values.CaseDrugs,
      DhDrugNote: values.DhDrugNote,
      OtcDrugNote: values.OtcDrugNote,
      HabitualHistories: [],
      HerbalHistories: []
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

    keys.filter(key => key.startsWith('herbalHistory')).forEach(herbalHistoryKey => {
      if (values[herbalHistoryKey]) {
        (data.HerbalHistories as any).push({
          HerbalId: Number(herbalHistoryKey.split('_').pop()),
        })
      }
    })

    const { status } = await CaseApi.updateCase(data)
    if (status !== 204) throw status
    props.history.push(ADD_CASE_STEP_FOUR_ROUTE)
  }

  const goToStepThree = () => {
    props.history.push(ADD_CASE_STEP_FOUR_ROUTE)    
  }

  const goToStepOne = () => {
    props.history.push(ADD_CASE_STEP_TWO_ROUTE)    
  }

  return (
    <Layout noHeader>
      <Container>
        <Heading title="Case Report" subtitle="3/6" onGoBack={goToStepOne} onGoForward={goToStepThree} />
        <AddCaseStepThreeForm onSubmit={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddCaseStepThree
