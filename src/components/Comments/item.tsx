import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { MdReply } from 'react-icons/md';
import avatarPhoto from '../../Assets/avatar.jpg';

const AuthorImage = styled.div<{ theme?: any }>`
  width: ${props => (props.theme.level === 1 ? '2.5rem' : '2rem')};
  height: ${props => (props.theme.level === 1 ? '2.5rem' : '2rem')};
  border-radius: 2rem;
  margin: 0.2rem 0.5rem 0 0;
  margin-top: ${props => props.theme.level === 1 && 0};
  cursor: pointer;
  background: ${props => `url(${props.theme.src}) center center no-repeat`};
  background-size: cover;
`;

const Col = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

const CommentText = styled.div`
  color: #424242;
  font-family: Roboto;
  margin-bottom: 0.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  text-align: left;
`;

const WriterName = styled.div`
  color: #5498a9;
  flex: 1;
  font-family: Roboto;
  cursor: pointer;
`;

const Line = styled.div`
  height: 60px;
  width: 1px;
  background-color: #ccc;
  margin-right: 7px;
  align-self: flex-start;
  margin-top: -35px;
`;

const Action = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 2.7rem;
  margin-right: 0.2rem;
  @media (min-width: 720px) {
    margin-right: 0.8rem;
    width: 3rem;
  }
`;

const CommentActions = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Text = styled.div`
  color: #bdbdbd;
  font-family: Roboto;
  font-size: 0.8rem;
  margin-left: 0.2rem;
  @media (min-width: 720px) {
    margin-left: 0.4rem;
  }
`;

const Reply = styled.div`
  color: #bdbdbd;
  width: 0.5rem;
  text-align: center;
  @media (min-width: 720px) {
    margin-right: 0.5rem;
  }
`;

const TimeAgo = styled.div`
  color: #bdbdbd;
  font-size: 0.8rem;
  font-family: Roboto;
  width: 6rem;
  text-align: right;
  margin-left: 0.3rem;
  @media (min-width: 720px) {
    width: 7rem;
    margin-left: 0.5rem;
  }
`;

type CommentItemProps = {
  handleLike: (CommentId: number, voted: boolean, isLike: boolean) => void;
  cm: any;
  level: number;
  onReply: (parentId: number) => void;
  goToProfile?: (parentId: number) => void;
};
const CommentItem: React.FC<CommentItemProps> = props => {
  const { cm, level, onReply, handleLike, goToProfile } = props;
  const [voted, setVoted] = useState(false);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [disLikeCount, setDisLikeCount] = useState(0);

  useEffect(() => {
    const effect = async () => {
      if (!cm) return;
      setVoted(cm.PersonVoted);
      setLike(cm.PersonVote);
      setLikeCount(cm.VoteUp);
      setDisLikeCount(cm.VoteDown);
    };

    effect();
  }, [cm]);

  const onVoting = async (isLike: boolean) => {
    const { CommentId } = cm;
    if (voted) {
      await handleLike(CommentId, true, isLike);
      if (like && !isLike) {
        setLike(false);
        setLikeCount(likeCount - 1);
        setDisLikeCount(disLikeCount + 1);
        await handleLike(CommentId, false, false);
      } else if (!like && isLike) {
        setLike(true);
        setLikeCount(likeCount + 1);
        setDisLikeCount(disLikeCount - 1);
        await handleLike(CommentId, false, true);
      } else {
        setVoted(false);
        setLike(false);
        setLikeCount(isLike ? likeCount - 1 : likeCount);
        setDisLikeCount(!isLike ? disLikeCount - 1 : disLikeCount);
      }
    } else {
      setVoted(true);
      if (isLike) {
        setLike(true);
        setLikeCount(likeCount + 1);
        await handleLike(CommentId, false, true);
      } else {
        setLike(false);
        setDisLikeCount(disLikeCount + 1);
        await handleLike(CommentId, false, false);
      }
    }
  };

  if (cm === null) return null;
  const { WriteById } = cm;
  return (
    <Wrapper>
      {level !== 1 ? <Line /> : null}
      <AuthorImage
        theme={{
          level,
          src: cm.WriterImage
            ? `https://api.pointina.ir/${cm.WriterImage}`
            : avatarPhoto
        }}
        onClick={() => goToProfile && goToProfile(WriteById)}
      />
      <Col>
        <WriterName onClick={() => goToProfile && goToProfile(WriteById)}>
          {cm.WriterFullName}
        </WriterName>
        <CommentText>{cm.CommentText}</CommentText>
        <CommentActions>
          <Action onClick={() => onVoting(true)}>
            <FaThumbsUp
              color={voted && like ? '#5498A9' : '#bdbdbd'}
              size={14}
            />
            <Text>{likeCount}</Text>
          </Action>
          <Action onClick={() => onVoting(false)}>
            <FaThumbsDown
              size={14}
              color={voted && !like ? '#f5a623' : '#bdbdbd'}
            />
            <Text>{disLikeCount}</Text>
          </Action>
          <Reply onClick={() => onReply(cm.CommentId)}>
            {level < 4 && <MdReply color="#bdbdbd" size={22} />}
          </Reply>
          <TimeAgo>{cm.TimeElapsed}</TimeAgo>
        </CommentActions>
      </Col>
    </Wrapper>
  );
};

export default CommentItem;
