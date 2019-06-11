import React, { useState } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import { BounceLoader } from 'react-spinners';

import Layout from '../../components/Partials/Layout';
import { connect } from 'react-redux';
import SearchInput from './Components/SearchInput';
import ChatListItem from './Components/ChatListItem';
import { UsersApi } from '../../Api/UsersApi';
import { API_FILES_BASE_URL } from 'constants/ApiConstants';
import { RouteComponentProps } from 'react-router';
import avatarPhoto from '../../Assets/avatar.jpg';

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ChatsWrapper = styled.div`
  margin-top: 1rem;
`;

const ChatsLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

interface ChatContainerProps {
  conversations: any[];
  isLoadingConversations: boolean;
}

function ChatContainer(props: ChatContainerProps & RouteComponentProps) {
  const { conversations, isLoadingConversations } = props;

  const [isSearchingUsers, setIsSearchingUsers] = useState(false);
  const [resultUsers, setResultUsers] = useState([]);
  const onSearchUsers = async (searchValue: string) => {
    setIsSearchingUsers(true);
    try {
      const response = await UsersApi.getUsers(searchValue);
      // console.log(response.data);
      setIsSearchingUsers(false);
      setResultUsers(response.data);
    } catch (_) {}
  };

  const onSearchUsersDebounced = debounce(onSearchUsers, 500);

  const goToChatPage = (user: any) =>
    props.history.push(`/chat/${user.PersonId}`);

  return (
    <Layout>
      <ChatListContainer>
        <SearchInput
          isLoading={isSearchingUsers}
          onChangeText={onSearchUsersDebounced}
        />
      </ChatListContainer>
      {isLoadingConversations && (
        <ChatsLoading>
          <BounceLoader sizeUnit="rem" size={2} color="#5498a9" loading />
        </ChatsLoading>
      )}
      <ChatsWrapper>
        {resultUsers.length > 0 &&
          resultUsers.map((user: any) => (
            <ChatListItem
              onClick={() => goToChatPage(user)}
              key={user.PersonId}
              name={user.FullName}
              avatarSource={
                user.ImageUrl
                  ? `${API_FILES_BASE_URL}/${user.ImageUrl}`
                  : avatarPhoto
              }
            />
          ))}
        {conversations.map(person => (
          <ChatListItem
            onClick={() => goToChatPage(person)}
            key={person.PersonId}
            name={person.FullName}
            avatarSource={
              person.ImageUrl
                ? `${API_FILES_BASE_URL}/${person.ImageUrl}`
                : avatarPhoto
            }
          />
        ))}
      </ChatsWrapper>
    </Layout>
  );
}

const mapStateToProps = (state: any) => {
  return {
    conversations: state.chat.conversations,
    isLoadingConversations: state.chat.isLoadingConversations
  };
};

export default connect(mapStateToProps)(ChatContainer);
