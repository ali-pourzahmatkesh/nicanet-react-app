import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/Partials/Layout';

const Title = styled.h2`
  font-size: 8rem;
  text-align: center;
  margin: 4rem 0;
`;

const Text = styled.div`
  font-size: 2rem;
  text-align: center;
`;

function NotFoundContainer(props) {
  return (
    <Layout>
      <Title>404</Title>
      <Text>Oops! Page not found</Text>
    </Layout>
  );
}

export default NotFoundContainer;
