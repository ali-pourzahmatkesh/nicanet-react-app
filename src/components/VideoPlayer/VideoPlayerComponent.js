import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

// import debounce from 'lodash.debounce';
// import Layout from '../../components/Partials/Layout';
// import { useState } from 'react';
// import SearchInput from './Components/SearchInput';
// import UserListItem from './Components/UserListItem';
// import { UsersApi } from '../../Api/UsersApi';
// import { API_FILES_BASE_URL } from 'constants/ApiConstants';
// import avatarPhoto from '../../Assets/avatar.jpg';

const Container = styled.div``;

function VideoPlayer(props) {
  const {
    autoPlay,
    poster,
    source,
    play,
    videoWidth,
    videoHeight,
    onEnded,
    diff
  } = props;

  const playerRef = useRef();
  const [currentTime, setCurrentTime] = useState(false);
  const [duration, setDuration] = useState([]);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const effect = async () => {
      const { player } = playerRef.current.getState();
      const different = diff || 1;
      setTimeout(() => {
        setCurrentTime(player.currentTime);
        setDuration(player.duration);
        setEnded(player.ended);
        // console.log('player', player);

        if (
          (diff &&
            Math.floor(player.currentTime) > 60 &&
            Math.floor(player.duration) - Math.floor(player.currentTime) <
              +different) ||
          (!diff && ended)
        ) {
          setEnded(false);
          !diff && playerRef.current.load();
          setTimeout(() => {
            onEnded();
          }, 0);
        }
      }, 10000);
    };
    effect();
  }, [currentTime, diff, duration, ended, onEnded]);

  useEffect(() => {
    const effect = async () => {
      if (play) {
        setEnded(false);
        playerRef.current.play();
      }
    };
    effect();
  }, [play]);

  return (
    <Container>
      <Player
        autoPlay={autoPlay}
        poster={poster}
        ref={playerRef}
        videoWidth={videoWidth}
        videoHeight={videoHeight}
      >
        <source src={source} />
      </Player>
    </Container>
  );
}

export default VideoPlayer;
