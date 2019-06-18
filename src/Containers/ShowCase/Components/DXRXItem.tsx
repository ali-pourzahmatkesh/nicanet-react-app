import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const ItemWrapper = styled.div`
  border-radius: 10px;
  padding: 1rem;
  margin: 0 0 1.3rem;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  background-color: #fff;
  @media (min-width: 720px) {
    margin: 0 3.2rem 1.3rem;
  }
`;

const Description = styled.div`
  font-family: Roboto;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const Action = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1.5rem;
  cursor: pointer;
`;

const NumberOFVotes = styled.div`
  font-family: Roboto;
  font-size: 0.7rem;
  color: #bdbdbd;
  margin-left: 5px;
`;

const TimeAgo = styled.div`
  font-family: Roboto;
  font-size: 0.8rem;
  color: #bdbdbd;
`;

type DXRXItemProps = {
  item: any;
  onLike: (voted: boolean) => void;
  onDisLike: (voted: boolean) => void;
};

const DXRXItem: React.FC<DXRXItemProps> = props => {
  const { item, onLike, onDisLike } = props;

  const [voted, setVoted] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [disLikeCount, setDisLikeCount] = useState<number>(0);

  useEffect(() => {
    const effect = async () => {
      if (!item) return;
      setVoted(item.PersonVoted);
      setLike(item.PersonVote);
      setLikeCount(item.VoteUp);
      setDisLikeCount(item.VoteDown);
    };

    effect();
  }, [item]);

  const onVoting = async (isLike: boolean) => {
    try {
      if (voted) {
        await onDisLike(true);
        if (like && !isLike) {
          setLike(false);
          setLikeCount(likeCount - 1);
          setDisLikeCount(disLikeCount + 1);
          await onDisLike(false);
        } else if (!like && isLike) {
          setLike(true);
          setLikeCount(likeCount + 1);
          setDisLikeCount(disLikeCount - 1);
          await onLike(false);
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
          await onLike(false);
        } else {
          setLike(false);
          setDisLikeCount(disLikeCount + 1);
          await onDisLike(false);
        }
      }
    } catch (err) {}
  };

  // console.log("item", item);
  return (
    <ItemWrapper>
      <Description>{item.Description}</Description>
      <Actions>
        <TimeAgo>{item.Date}</TimeAgo>
        <Action onClick={() => onVoting(false)}>
          <FaThumbsDown
            color={voted && !like ? '#f5a623' : '#bdbdbd'}
            size={14}
          />
          <NumberOFVotes>{disLikeCount}</NumberOFVotes>
        </Action>
        <Action onClick={() => onVoting(true)}>
          <FaThumbsUp color={voted && like ? '#5498A9' : '#bdbdbd'} size={14} />
          <NumberOFVotes>{likeCount}</NumberOFVotes>
        </Action>
      </Actions>
    </ItemWrapper>
  );
};

export default DXRXItem;
