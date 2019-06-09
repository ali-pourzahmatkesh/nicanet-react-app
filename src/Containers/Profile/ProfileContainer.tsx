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

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border: solid 1px #eeeeee;
`;

const UserInfoWrapper = styled.div`
  border-radius: 5px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  padding: 1rem;
  position: relative;
  margin-bottom: 1rem;
`;

const PenIcon = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const Title = styled.div`
  font-family: Roboto;
  font-size: 1rem;
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
  const [user, setUser] = useState(null);

  // console.log('isOwn', isOwn);

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

  const { ImageUrl, FullName, Expertise, Email, Bio, PersonId } = user;

  return (
    <Layout>
      <UserInfoWrapper>
        <Avatar
          src={ImageUrl ? `${API_FILES_BASE_URL}/${ImageUrl}` : avatarPhoto}
        />
        <Title>{FullName}</Title>
        <Subtitle>{Expertise}</Subtitle>
        <PrimaryText>{Email}</PrimaryText>
        <Paragraph>{Bio}</Paragraph>
        {isOwn && (
          <PenIcon
            src={PenIconSvg}
            onClick={() => {
              props.history.push('/edit-profile');
            }}
          />
        )}
      </UserInfoWrapper>

      {contentIsFetching && (
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      )}

      {content.length > 0 &&
        content.map((content: any) => (
          <Card
            onClick={() => {
              props.history.push(`/post/${content.ContentId}`);
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

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(ProfileContainer);
