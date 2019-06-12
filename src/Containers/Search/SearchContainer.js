import React from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import Layout from '../../components/Partials/Layout';
import { useState } from 'react';
import SearchInput from './Components/SearchInput';
import UserListItem from './Components/UserListItem';
import { UsersApi } from '../../Api/UsersApi';
import { API_FILES_BASE_URL } from 'constants/ApiConstants';
import avatarPhoto from '../../Assets/avatar.jpg';

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 1rem;
`;

const Users = styled.div`
  margin-top: 1rem;
`;

function SearchContainer(props) {
  const [isSearchingUsers, setIsSearchingUsers] = useState(false);
  const [resultUsers, setResultUsers] = useState([]);

  const onSearchUsers = async searchValue => {
    setIsSearchingUsers(true);
    try {
      const response = await UsersApi.getUsers(searchValue);
      setIsSearchingUsers(false);
      setResultUsers(response.data);
    } catch (_) {}
  };

  const onSearchUsersDebounced = debounce(onSearchUsers, 500);

  return (
    <Layout>
      <UserListContainer>
        <SearchInput
          isLoading={isSearchingUsers}
          onChangeText={onSearchUsersDebounced}
        />
      </UserListContainer>

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
    </Layout>
  );
}

export default SearchContainer;
