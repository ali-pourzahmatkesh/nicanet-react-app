import React from 'react';
import styled from 'styled-components';
import { BounceLoader } from 'react-spinners';
import debounce from 'lodash.debounce';
import { ContentApi } from '../../Api/ContentApi';
import Layout from '../../components/Partials/Layout';
import Card from '../../components/Card/CardComponent';
import logo from '../../Assets/logo.svg';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import SearchInput from './Components/SearchInput';
import UserListItem from './Components/UserListItem';
import Navbar from 'components/Navbar/Navbar';
import { UsersApi } from '../../Api/UsersApi';
import { API_FILES_BASE_URL } from 'constants/ApiConstants';
import avatarPhoto from '../../Assets/avatar.jpg';

const Logo = styled.img`
  margin: 0 auto;
  display: block;
  @media (min-width: 720px) {
    display: none;
  }
`;

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 -1rem 1rem;
  padding: 1rem;
  border-bottom: solid 1px #979797;
  @media (min-width: 720px) {
    padding: 0 1rem 1rem;
  }
`;

const Users = styled.div`
  margin-top: 1rem;
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
  const [isSearchingUsers, setIsSearchingUsers] = useState(false);
  const [searchUserValue, setSearchUserValue] = useState(false);
  const [resultUsers, setResultUsers] = useState([]);

  useEffect(() => {
    const effect = async () => {
      try {
        const response = await ContentApi.getAllContent(userId);

        if (response.status !== 200) {
          setContent([]);
        }
        setContent(response.data);
        // console.log('response.data', response.data);
      } catch (_) {
      } finally {
        setContentIsFetching(false);
      }
    };
    effect();
  }, []);

  const onSearchUsers = async searchValue => {
    setIsSearchingUsers(true);
    setSearchUserValue(searchValue);
    try {
      if (!searchValue) {
        setResultUsers([]);
        setIsSearchingUsers(false);
        return;
      }
      const response = await UsersApi.getUsers(searchValue);
      setIsSearchingUsers(false);
      setResultUsers(response.data);
    } catch (_) {}
  };

  const onSearchUsersDebounced = debounce(onSearchUsers, 500);

  const goToPage = route => {
    props.history.push(route);
  };

  return (
    <Layout noHeader>
      <Logo src={logo} />
      <UserListContainer>
        <SearchInput
          isLoading={isSearchingUsers}
          onChangeText={onSearchUsersDebounced}
        />
      </UserListContainer>

      {resultUsers.length > 0 || searchUserValue ? (
        <Users>
          {resultUsers.length > 0 &&
            resultUsers.map(user => (
              <UserListItem
                onClick={() => props.history.push(`/profile/${user.PersonId}`)}
                key={user.PersonId}
                name={user.FullName}
                avatarSource={
                  user.ImageUrl
                    ? `${API_FILES_BASE_URL}/${user.ImageUrl}`
                    : avatarPhoto
                }
              />
            ))}
        </Users>
      ) : (
        <div>
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
                  if (content.TypeId === 118) return;
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
                  content.MultiMedias.length > 0 &&
                  content.MultiMedias[0].FileUrl
                }
                typeId={content.TypeId}
                author={{
                  image: content.WriterImage,
                  title: content.WriterFullName,
                  publishTime: content.TimeElapsed
                }}
              />
            ))}
        </div>
      )}
    </Layout>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.auth.user.PersonId
  };
};

export default connect(mapStateToProps)(HomeContainer);
