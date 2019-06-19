import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { BounceLoader } from 'react-spinners';
import styled from 'styled-components';
import { UsersApi } from 'Api/UsersApi';
import Layout from '../../components/Partials/Layout';
import { connect } from 'react-redux';
import { ContentApi } from 'Api/ContentApi';
import Card from 'components/Card/CardComponent';
import { API_FILES_BASE_URL } from 'constants/ApiConstants';
import PenIconSvg from 'Assets/Pen.svg';
import avatarPhoto from '../../Assets/avatar.jpg';
import Navbar from 'components/Navbar/Navbar';

const Avatar = styled.div<{ src?: string }>`
  width: 60px;
  height: 60px;
  border-radius: 2rem;
  border: solid 1px #eeeeee;
  margin-right: 1rem;
  background: ${props => `url(${props.src}) center center no-repeat`};
  background-size: cover;
`;

const UserInfoWrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  padding: 1rem;
  position: relative;
  margin-bottom: 1rem;
`;

const NavbarWrapper = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: solid 1px #979797;
`;

const PenIcon = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const SubscribeButton = styled.div<{ isSubscribe?: boolean }>`
  width: 120px;
  text-align: center;
  padding: 0.4rem;
  background-color: ${props => (props.isSubscribe ? '#7ED321' : '#5498A9')};
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  border-radius: 20px;
  color: #fff;
  font-size: 0.9rem;
`;

const Title = styled.div`
  font-family: Roboto;
  font-size: 1.2rem;
  font-weight: bold;
  color: #000000;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.div`
  font-family: Roboto;
  font-size: 0.9rem;
  color: #000000;
  margin-bottom: 0.5rem;
`;

const PrimaryText = styled.div`
  font-family: Roboto;
  font-size: 0.9rem;
  color: #5498a9;
  margin-bottom: 0.5rem;
`;

const Paragraph = styled.div`
  font-family: Roboto;
  font-size: 0.9rem;
  color: #282828;
  margin-bottom: 0.5rem;
`;

export const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

interface ProfileContainerProps {
  user: any;
}

function ProfileContainer(
  props: ProfileContainerProps & RouteComponentProps<{ userId: '' }>
) {
  const { match } = props;
  const { params } = match;
  const { userId } = params;

  const [content, setContent] = useState([]);
  const [contentIsFetching, setContentIsFetching] = useState(true);
  const [isOwn, setIsOwn] = useState(false);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [user, setUser] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    const effect = async () => {
      try {
        setIsOwn(userId ? +props.user.PersonId === +userId : true);
      } catch (error) {
        console.log('error in detect profile type');
      }
    };
    effect();
  }, [props.user.PersonId, userId]);

  useEffect(() => {
    const effect = async () => {
      try {
        if (isOwn) {
          const response = await UsersApi.getCurrentUser();
          if (response.status === 200) {
            const data = response.data;
            setUser(data);
          }
        } else if (userId) {
          const response = await ContentApi.getPerson(userId);
          if (response.status === 200) {
            const data = response.data;
            setUser(data);
            setIsSubscribe(data.IsSubscribe);
            setSubscriberCount(data.SubscriberCount);
          }
        }
      } catch (_) {}
    };
    effect();
  }, [isOwn, props.user, userId]);

  useEffect(() => {
    const effect = async () => {
      try {
        const response = isOwn
          ? await ContentApi.getCurrentPersonContents()
          : userId && (await ContentApi.getPersonPosts(userId));
        response && setContent(response.data);
      } catch (_) {
      } finally {
        setContentIsFetching(false);
      }
    };
    effect();
  }, [isOwn, userId]);

  if (user === null)
    return (
      <Layout>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );

  const onSubscribeButton = async (PersonId: any) => {
    try {
      if (isSubscribe) {
        const { status } = await UsersApi.unSubscribe(PersonId);
        if (status !== 204) throw new Error(status.toString());
        setIsSubscribe(false);
        setSubscriberCount(subscriberCount - 1);
      } else {
        const { status } = await UsersApi.subscribe(PersonId);
        if (status !== 204) throw new Error(status.toString());
        setIsSubscribe(true);
        setSubscriberCount(subscriberCount + 1);
      }
    } catch (_) {}
  };

  const { ImageUrl, FullName, Group, Bio, PersonId } = user;
  const { ConfigName } = Group;
  const goToPage = (route: any) => {
    props.history.push(route);
  };

  return (
    <Layout>
      <UserInfoWrapper>
        <Avatar
          src={ImageUrl ? `${API_FILES_BASE_URL}/${ImageUrl}` : avatarPhoto}
        />
        <Title>{FullName}</Title>
        <Subtitle>{ConfigName}</Subtitle>
        {subscriberCount !== 0 && (
          <PrimaryText>{`${subscriberCount} Subscribers`}</PrimaryText>
        )}
        <Paragraph>{Bio}</Paragraph>
        {isOwn ? (
          <PenIcon
            src={PenIconSvg}
            onClick={() => {
              props.history.push('/edit-profile');
            }}
          />
        ) : (
          <SubscribeButton
            isSubscribe={isSubscribe}
            onClick={() => onSubscribeButton(PersonId)}
          >
            {isSubscribe ? 'Subscribed' : 'Subscribe'}
          </SubscribeButton>
        )}
      </UserInfoWrapper>

      <NavbarWrapper>
        <Navbar onSelectRoute={goToPage} />
      </NavbarWrapper>

      {contentIsFetching && (
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      )}

      {content.length > 0 &&
        content.map((content: any) => (
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
              content.MultiMedias.length > 0 && content.MultiMedias[0].FileUrl
            }
            typeId={content.TypeId}
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

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(ProfileContainer);
