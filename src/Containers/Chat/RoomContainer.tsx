import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  Fragment
} from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { BounceLoader } from 'react-spinners';

import Layout from 'components/Partials/Layout';
import MessageInput from './Components/MessageInput';
import { CHAT_ROUTE } from 'router/RouterConstants';
import { UsersApi } from 'Api/UsersApi';
import { API_FILES_BASE_URL } from 'constants/ApiConstants';
import { getPersonId } from 'utils/auth';
import { chatMiddleWare } from '../../Redux/MiddlesWares/ChatMiddleWare';
import Message from './Components/Message';
import avatarPhoto from '../../Assets/avatar.jpg';

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #eee;
  align-items: center;
`;

const ContactImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
  border: 2px solid #5498a9;
  background-size: cover;
`;

const BackButton = styled.div`
  cursor: pointer;
`;

const ContactName = styled.div``;

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  height: calc(100vh - 260px);
  overflow: hidden;
  overflow-y: scroll;
`;

const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

interface RoomContainerParams {
  contactId: string;
}

function RoomContainer(props: RouteComponentProps<RoomContainerParams>) {
  const personId = getPersonId();
  const { contactId } = props.match.params;
  const [contact, setContact] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const messageContainerRef: any = useRef(HTMLDivElement);

  const sendMessage = async (content: string, callback: any) => {
    const message: any = {
      type: 'text',
      receiver: contactId,
      sender: personId.toString(),
      content: content,
      isFromCurrentUser: true,
      _id: Date.now()
    };
    const response = await UsersApi.sendMessage(message);
    if (response.status === 200) {
      callback(true);
      addMessage(message);
    } else callback(false);
  };

  const getMessages = useCallback(async () => {
    setIsLoading(true);
    const { data: responseContact } = await UsersApi.getUser(contactId);
    setContact(responseContact);
    const responseMessages = await UsersApi.getUserMessages(
      personId,
      responseContact.PersonId
    );
    const messaages = (responseMessages.data || []).map((message: any) => ({
      ...message,
      isFromCurrentUser: message.sender === personId.toString()
    }));
    setMessages([...messaages].reverse());
    setIsLoading(false);
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [contactId, personId]);

  const addMessage = (message: any) => {
    const newMessages = [...messages, message];
    setMessages(newMessages);

    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  useEffect(() => {
    chatMiddleWare.subscribe(contactId, addMessage);
    return () => chatMiddleWare.unSubscribe(contactId);
  });

  if (isLoading) {
    return (
      <Layout>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );
  }

  return (
    <Fragment>
      {contact && (
        <ChatHeader>
          <BackButton>
            <IoIosArrowBack
              style={{ color: '#555' }}
              onClick={() => props.history.push(CHAT_ROUTE)}
              size={30}
            />
          </BackButton>
          <ContactName>{contact.FullName}</ContactName>
          <ContactImage
            src={
              contact.ImageUrl
                ? `${API_FILES_BASE_URL}/${contact.ImageUrl}`
                : avatarPhoto
            }
          />
        </ChatHeader>
      )}
      <Layout>
        <MessagesWrapper ref={messageContainerRef}>
          {messages.map(message => (
            <Message key={message._id} message={message} />
          ))}
        </MessagesWrapper>
        <MessageInput onSend={sendMessage} />
      </Layout>
    </Fragment>
  );
}

export default RoomContainer;
