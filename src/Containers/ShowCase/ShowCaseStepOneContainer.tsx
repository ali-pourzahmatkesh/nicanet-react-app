import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import Heading from './Components/Heading';
import ShowCaseStepOne from './Content/ShowCaseStepOne';
import { ContentApi } from 'Api/ContentApi';
import { CaseApi } from '../../Api/CaseApi';
import { connect } from 'react-redux';
import { NOT_FOUND_ROUTE, HOME_ROUTE } from '../../router/RouterConstants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';

const Container = styled.div`
  padding: 0;
`;

interface ShowCaseStepOneContainerProps {
  caseId: string;
  user: any;
}

function ShowCaseStepOneContainer(
  props: ShowCaseStepOneContainerProps & RouteComponentProps<{ caseId: '' }>
) {
  const { user } = props;
  const { caseId } = props.match.params;

  const [caseInfo, setCase] = useState(null);
  const [contentId, setContentId] = useState('');

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await CaseApi.getCase(caseId, true);
        if (response.status === 200) {
          const data = response.data;
          setCase(data);
          setContentId(data.ContentId);
        }
      } catch (err) {
        console.log('error in get case: ', err);
        props.history.push(NOT_FOUND_ROUTE);
      }
    };
    effect();
  }, [caseId, props.history]);

  const goForward = () => {
    props.history.push(`/show-case-step-two/${caseId}`);
  };

  const goBackward = () => {
    props.history.goBack();
  };

  const deleteConfirmation = () => {
    confirmAlert({
      title: 'Are you sure?',
      message:
        'Do you really want to delete this case? This Process cantnot be undone.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onDelete()
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const onDelete = async () => {
    try {
      if (!contentId) return;
      const response = await ContentApi.deleteContent(contentId);
      if (response.status !== 204) return;
      toast.success('This case deleted', {
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout(() => {
        props.history.push(HOME_ROUTE);
      }, 4000);
    } catch (err) {
      console.log('error in delete case: ', err);
    }
  };

  return (
    <Layout noHeader>
      <div className="container">
        <Heading
          title="Case Report"
          onGoBack={goBackward}
          onGoForward={goForward}
        />
        <Container>
          <ShowCaseStepOne
            onSubmit={goForward}
            caseInfo={caseInfo}
            onDelete={deleteConfirmation}
            user={user}
          />
        </Container>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(ShowCaseStepOneContainer);
