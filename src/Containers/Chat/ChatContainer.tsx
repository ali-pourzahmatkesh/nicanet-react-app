import React, { useState } from 'react'
import styled from 'styled-components'
import debounce from 'lodash.debounce'

import HeaderComponent from '../../components/Header/HeaderComponent'
import Layout, { ContentContainer } from '../../components/Partials/Layout'
import { connect } from 'react-redux';
import SearchInput from './Components/SearchInput';
import ChatListItem from './Components/ChatListItem';
import { UsersApi } from '../../Api/UsersApi';
import { API_FILES_BASE_URL } from 'constants/ApiConstants';
import { RouteComponentProps } from 'react-router';

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const ChatsWrapper = styled.div`
  margin-top: 1rem;
`

interface ChatContainerProps {
  conversations: any[]
} 

function ChatContainer(props: ChatContainerProps & RouteComponentProps) {

  const { conversations } = props

  const [isSearchingUsers, setIsSearchingUsers] = useState(false)
  const [resultUsers, setResultUsers] = useState([])
  const onSearchUsers = async (searchValue: string) => {
    setIsSearchingUsers(true)
    try {
      const response = await UsersApi.getUsers(searchValue)
      console.log(response.data)
      setIsSearchingUsers(false)
      setResultUsers(response.data)
    } catch (_) {}
  };
  
  const onSearchUsersDebounced = debounce(onSearchUsers, 500)

  const goToChatPage = (user: any) => props.history.push(`/chat/${user.PersonId}`)

  return (
    <Layout>
      <HeaderComponent />
      <ContentContainer>
        <ChatListContainer>
          <SearchInput isLoading={isSearchingUsers} onChangeText={onSearchUsersDebounced} />
        </ChatListContainer>
        <ChatsWrapper>
          {
            resultUsers.length > 0 && 
            resultUsers.map((user: any) => 
              <ChatListItem
                onClick={() => goToChatPage(user)}
                key={user.PersonId}
                name={user.FullName} 
                avatarSource={`${API_FILES_BASE_URL}/${user.ImageUrl}`}
              />)
          }
          {
            conversations.map(person => <ChatListItem
              onClick={() => goToChatPage(person)}
              key={person.PersonId}
              name={person.FullName} 
              avatarSource={`${API_FILES_BASE_URL}/${person.ImageUrl}`}
            />)
          }
        </ChatsWrapper>
      </ContentContainer>
    </Layout>
  )
}

const mapStateToProps = (state: any) => {
  return ({
    conversations: state.chat.conversations,
  })
}

export default connect(mapStateToProps)(ChatContainer)