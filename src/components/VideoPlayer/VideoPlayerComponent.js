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
  const { autoPlay, poster, source, play, videoWidth, videoHeight } = props;

  const playerRef = useRef();
  // const [isSearchingUsers, setIsSearchingUsers] = useState(false);
  // const [resultUsers, setResultUsers] = useState([]);

  useEffect(() => {
    const effect = async () => {
      if (play) {
        playerRef.current.play();
      }
    };
    effect();
  }, [play]);

  // const onSearchUsers = async searchValue => {
  //   setIsSearchingUsers(true);
  //   try {
  //     const response = await UsersApi.getUsers(searchValue);
  //     setIsSearchingUsers(false);
  //     setResultUsers(response.data);
  //   } catch (_) { }
  // };

  // const onSearchUsersDebounced = debounce(onSearchUsers, 500);

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
