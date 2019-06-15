import React from 'react';
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import Heading from './Components/Heading';
import AddCaseStepThreeForm from './Forms/AddCaseStepThreeForm';
import { CaseApi } from 'Api/CaseApi';
import { setCase } from '../../utils/utils';

const Container = styled.div`
  padding: 0 1rem;
`;

const AddCaseStepThree: React.FC<
  RouteComponentProps<{ caseId: '' }>
> = props => {
  const { match } = props;
  const { params } = match;
  const { caseId } = params;

  const onSubmit = async (values: any) => {
    const currentCaseRaw = localStorage.getItem('current_case');
    if (currentCaseRaw === null) return;
    const { CaseId } = JSON.parse(currentCaseRaw);

    const data = {
      StatusId: 3,
      CaseId,
      CaseDrugs: values.CaseDrugs,
      DhDrugNote: values.DhDrugNote,
      OtcDrugNote: values.OtcDrugNote,
      HabitualHistories: [],
      HerbalHistories: []
    };

    const keys = Object.keys(values);

    keys
      .filter(key => key.startsWith('habitualHistory_check'))
      .forEach(habitualHistoryKey => {
        const habitualHistoryValue = values[habitualHistoryKey];
        const habitualHistoryValueKeyId = habitualHistoryKey.split('_').pop();
        const habitualHistoryUsageKey: string = `habitualHistory_usage_${habitualHistoryValueKeyId}`;
        const habitualHistoryDurationKey: string = `habitualHistory_duration_${habitualHistoryValueKeyId}`;

        if (
          habitualHistoryValue &&
          values[habitualHistoryUsageKey] &&
          values[habitualHistoryDurationKey]
        ) {
          (data.HabitualHistories as any).push({
            HabitualTypeId: Number(habitualHistoryValueKeyId),
            DailyUsage: values[habitualHistoryUsageKey],
            Duration: values[habitualHistoryDurationKey]
          });
        }
      });

    keys
      .filter(key => key.startsWith('herbalHistory'))
      .forEach(herbalHistoryKey => {
        if (values[herbalHistoryKey]) {
          (data.HerbalHistories as any).push({
            HerbalId: Number(herbalHistoryKey.split('_').pop())
          });
        }
      });

    const { status } = await CaseApi.updateCase(data);
    if (status !== 204) throw status;
    await setCase(caseId, values);
    props.history.push(`/add-case-step-four/${caseId}`);
  };

  const goToStepThree = () => {
    props.history.push(`/add-case-step-four/${caseId}`);
  };

  const goToStepOne = () => {
    props.history.push(`/add-case-step-two/${caseId}`);
  };

  return (
    <Layout noHeader>
      <Container>
        <Heading
          title="Case Report"
          subtitle="3/6"
          onGoBack={goToStepOne}
          onGoForward={goToStepThree}
        />
        <AddCaseStepThreeForm onSubmit={onSubmit} caseId={caseId} />
      </Container>
    </Layout>
  );
};

export default AddCaseStepThree;
