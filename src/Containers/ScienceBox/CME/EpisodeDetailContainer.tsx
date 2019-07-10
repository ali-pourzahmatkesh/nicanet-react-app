import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BounceLoader } from 'react-spinners';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { CmeApi } from '../../../Api/CmeApi';
import avatarPhoto from '../../../Assets/avatar.jpg';
import VideoPlayer from '../../../components/VideoPlayer/VideoPlayerComponent';

const Container = styled.div`
  margin-top: -10px;
  @media (min-width: 720px) {
    margin-top: 0;
    padding: 30px 30px 0;
  }
`;

const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const EpisodInfoWrapper = styled.div`
  padding: 10px 20px 0;
`;

const AuthorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  @media (min-width: 720px) {
    padding-top: 10px;
  }
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 24px;
  margin-right: 1rem;
  background: ${props => `url(${props.src}) center center no-repeat`};
  background-size: cover;
`;

const AuthorName = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const AuthorJob = styled.div`
  font-size: 10px;
  margin-bottom: 4px;
`;

const EpisodTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
`;

const EpisodDesc = styled.div`
  color: #757575;
  font-size: 12px;
  margin: 10px 0 15px;
  @media (min-width: 720px) {
    margin: 20px 0 15px;
  }
`;

const WatchedLabel = styled.div`
  background-color: rgba(126, 211, 33, 0.7);
  width: 60px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  @media (min-width: 720px) {
    width: 96px;
    height: 34px;
  }
`;

const WatchedText = styled.div`
  color: rgb(33, 33, 33);
  font-size: 10px;
  font-weight: bold;
`;

const TimeReleased = styled.div`
  color: rgb(117, 117, 117);
  font-size: 10px;
`;

const VideoPlayerWrapper = styled.div``;

const Media = styled.div`
  margin-bottom: 10px;
`;

interface EpisodeDetailContainerProps {}

function EpisodeDetailContainer(
  props: EpisodeDetailContainerProps & RouteComponentProps<{ episodId: '' }>
) {
  const { match } = props;
  const { params } = match;
  const { episodId } = params;

  const [episod, setEpisod] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [callWatched, setCallWatched] = useState(false);

  useEffect(() => {
    const effect = async () => {
      setIsFetching(true);
      try {
        // let response = await CmeApi.getEpisod(episodId);
        let response = await CmeApi.getEpisode(episodId);
        if (response.status === 200) {
          setEpisod(response.data);
          console.log('response.data', response.data);
        }
      } catch (_) {
      } finally {
        setIsFetching(false);
      }
    };
    effect();
  }, [episodId]);

  const WatchEpisode = async () => {
    try {
      if (!callWatched) {
        let response = await CmeApi.WatchEpisode(episodId);
        if (response.status === 204) {
          setCallWatched(true);
        }
      }
    } catch (_) {}
  };

  if (isFetching)
    return (
      <Layout title="Episodes">
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );

  if (episod === null)
    return (
      <Layout title="Episodes">
        <div />
      </Layout>
    );

  const {
    Name: name,
    EpisodeCover: episodeCover,
    EpisodeUrl: episodeUrl,
    Description: description,
    Teacher: episodTeacher,
    TeacherImage: episodTeacherImage,
    TeacherMajor: episodTeacherMajor,
    Watched: watched
  } = episod;

  return (
    <Layout title="Episodes" noPadding hasZindex>
      <Container>
        <Media>
          <VideoPlayerWrapper>
            <VideoPlayer
              poster={`https://api.pointina.ir${episodeCover}`}
              source={`https://api.pointina.ir${episodeUrl}`}
              videoWidth="100%"
              videoHeight="100%"
              onEnded={WatchEpisode}
              diff="60"
            />
          </VideoPlayerWrapper>
        </Media>
        <EpisodInfoWrapper>
          <DetailsWrapper>
            <AuthorWrapper>
              <AuthorImage
                src={
                  episodTeacherImage
                    ? `https://api.pointina.ir${episodTeacherImage}`
                    : avatarPhoto
                }
              />
              <div>
                <AuthorName>{episodTeacher}</AuthorName>
                <AuthorJob>{episodTeacherMajor}</AuthorJob>
                <TimeReleased>Today, 2hrs ago</TimeReleased>
              </div>
            </AuthorWrapper>

            {watched && (
              <WatchedLabel>
                <WatchedText>Watched</WatchedText>
              </WatchedLabel>
            )}
          </DetailsWrapper>

          <EpisodTitle>{name}</EpisodTitle>
          <EpisodDesc>{description}</EpisodDesc>
        </EpisodInfoWrapper>
      </Container>
    </Layout>
  );
}

export default EpisodeDetailContainer;
