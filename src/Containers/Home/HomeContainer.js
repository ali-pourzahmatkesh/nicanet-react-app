import React from 'react';
import styled from 'styled-components';
import { BounceLoader } from 'react-spinners';
import { ContentApi } from '../../Api/ContentApi';
import Layout from '../../components/Partials/Layout';
import Card from '../../components/Card/CardComponent';
import logo from '../../Assets/logo.svg';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import Navbar from 'components/Navbar/Navbar';

const Logo = styled.img`
  margin: 0 auto;
  display: block;
`;

const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

function HomeContainer(props) {
  const { userId } = props;
  const [content, setContent] = useState(null);
  const [contentIsFetching, setContentIsFetching] = useState(true);

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await ContentApi.getAllContent(userId);

        if (response.status !== 200) {
          setContent([]);
        }
        setContent(response.data);
        console.log('response.data', response.data);
      } catch (_) {
      } finally {
        setContentIsFetching(false);
      }
    };
    effect();
  }, [userId]);

  const goToPage = route => {
    props.history.push(route);
  };

  return (
    <Layout>
      <Logo src={logo} />
      <Navbar onSelectRoute={goToPage} />

      {contentIsFetching && (
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      )}
      
      {content &&
        content.length > 0 &&
        content.map(content => (
          <Card
            onClick={() => {
              if (content.CaseId === 0) {
                props.history.push(`/post/${content.ContentId}`);
              } else {
                props.history.push(`/show-case-step-one/${content.CaseId}`);
              }
            }}
            key={content.ContentId}
            title={content.Subject}
            subtitle={content.ContentText}
            image={
              content.MultiMedias.length > 0 && content.MultiMedias[0].FileUrl
            }
            author={{
              image: content.WriterImage,
              title: content.WriterFullName,
              publishTime: content.TimeElapsed
            }}
          />
        ))}
    </Layout>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.auth.user.PersonId
  };
};

export default connect(mapStateToProps)(HomeContainer);
