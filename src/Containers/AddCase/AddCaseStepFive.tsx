import React, { useState } from 'react'
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { ADD_CASE_STEP_SIX_ROUTE, ADD_CASE_STEP_FOUR_ROUTE } from 'router/RouterConstants';
import Heading from './Components/Heading';
import AddCaseStepFiveFormOne from './Forms/AddCaseStepFiveFormOne';
import AddCaseStepFiveFormTwo from './Forms/AddCaseStepFiveFormTwo';
import MultiButton from 'components/MultiButton/MultiButton';
import ContinueButton from './Components/ContinueButton';
import { CaseApi } from 'Api/CaseApi';

const Container = styled.div`
  padding: 0 1rem;
`

function getFormOneValues() {
  const valuesRaw = localStorage.getItem('AddCaseStepFiveFormOne')
  if (valuesRaw === null) return {}
  const values = JSON.parse(valuesRaw)

  const nextData = {
    BloodBank: {
      BloodGroupId: values.BloodGroupId !== undefined ? +values.BloodGroupId : undefined,
      RH: values.RH !== undefined ? +values.RH : undefined,
      CrossMatch: values.CrossMatch,
      BloodBankNote: values.BloodBankNote,
    },
    Examinations: [],
  }

  const keys = Object.keys(values)
  keys.filter(key => key.startsWith('ExaminationValue_')).forEach(examinationValueKey => {
    const ExaminationTypeId = Number(examinationValueKey.split('_').pop())
    const examinationValue = values[examinationValueKey]
    const examinationValueUnitId = values[`Unit_ExaminationValue_${ExaminationTypeId}`]

    if (examinationValue === undefined) return
    if (examinationValueUnitId === undefined) return

    (nextData.Examinations as any).push({
      ExaminationTypeId,
      Note: '',
      ExaminationValue: examinationValue,
      UnitId: +examinationValueUnitId,
    })
  })

  keys.filter(key => key.startsWith('Note_ExaminationValue_')).forEach(examinationValueKey => {
    const ExaminationTypeId = Number(examinationValueKey.split('_').pop())
    const noteValue = values[examinationValueKey]

    if (noteValue === undefined) return

    (nextData.Examinations as any).push({
      ExaminationTypeId,
      Note: noteValue,
      ExaminationValue: '',
      UnitId: 0,
    })
  })

  return nextData
}

function getFormTwoValues() {
  const valuesRaw = localStorage.getItem('AddCaseStepFiveFormTwo')
  if (valuesRaw === null) return {}
  const values = JSON.parse(valuesRaw)
  const keys = Object.keys(values)

  const nextData = {
    ImagingDescription: []
  }

  keys.filter(key => key.startsWith('DescriptionTypeId_')).forEach(description => {
    const DescriptionTypeId = Number(description.split('_').pop())
    const Description = values[description]

    if (Description === undefined) return

    (nextData.ImagingDescription as any).push({
      DescriptionTypeId,
      Description,
    })
  })

  return nextData
}


const AddCaseStepFive: React.FC<RouteComponentProps<{}>> = (props) => {
  const [activeTabName, setActiveTabName] = useState('Lab Test')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      const currentCaseRaw = localStorage.getItem('current_case')
      if (currentCaseRaw === null) return
  
      const { CaseId } = JSON.parse(currentCaseRaw)
      const formOneValues = getFormOneValues()
      const formTwoValues = getFormTwoValues()
      const data = {
        StatusId: 5,
        CaseId,
        ...formOneValues,
        ...formTwoValues,
      }
  
      const { status } = await CaseApi.updateCase(data)
      if (status !== 204) throw status
      props.history.push(ADD_CASE_STEP_SIX_ROUTE)
    } catch (_) {
      setIsSubmitting(false)
    }
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
        <ContinueButton isLoading={isSubmitting} onClick={onSubmit} />
      </Container>
    </Layout>
  )
}

export default AddCaseStepFive
