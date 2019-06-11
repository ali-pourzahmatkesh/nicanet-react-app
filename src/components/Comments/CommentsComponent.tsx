import React, { useState } from 'react';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';
import { MdSend } from 'react-icons/md';
import { ContentApi } from '../../Api/ContentApi';
import { CaseApi } from '../../Api/CaseApi';
import CommentItem from './item';

const CommentWrapper = styled.div`
  padding: 1rem;
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-family: Roboto;
  font-weight: 'bold';
  color: '#212121';
  text-align: left;
  margin: 1rem 0;
`;

const Comment = styled.div<{ title?: string }>`
  padding-top: 0.5rem;
  border-radius: 5px;
  padding-left: ${props => (props.title !== '1' ? '1rem' : '0')};
`;

const CommentForm = styled.div`
  display: flex;
  felx-direction: row;
  align-items: center;
  background: #f5f5f5;
  padding: 0.3rem 1rem;
  border-top: 1px solid #ddd;
`;

const StyledInput = styled.input`
  border: 0;
  border-bottom: 1px solid #aaa;
  padding: 0.6em 1.4em 0.5em 0.8em;
  display: flex;
  flex: 1;
  font-size: 1rem;
  outline: 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 25px;
`;

const SendButton = styled.div`
  width: 3rem;
  text-align: right;
`;

const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem;
`;

type CommentsProps = {
  onClose?: () => void;
  updateContent: () => void;
  content: any;
  source: string;
  comments: any[];
  goToProfile?: (WriteById: number) => void;
};

const Comments: React.FC<CommentsProps> = props => {
  const { content, source, updateContent, comments, goToProfile } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [parentId, setParentId] = useState(1);
  const [inputText, setInputText] = useState<any>(null);

  const onReply = (parentId: number) => {
    setParentId(parentId);
    inputText.focus();
  };

  const onSubmit = async (parentId: number) => {
    setIsSubmitting(true);
    if (!commentText) return;

    const url =
      source === 'post'
        ? 'Comment'
        : source === 'DX'
        ? 'DxComment'
        : 'RxComment';

    let params = {};

    if (source === 'post') {
      params = {
        ParentId: parentId,
        commentText,
        isSpam: false,
        isPublished: true,
        ContentId: content && content.ContentId
      };
    } else {
      params = {
        ParentId: parentId,
        commentText,
        CaseId: content && content.CaseId
      };
    }

    try {
      const { status } = await ContentApi.sendComment(url, params);
      if (status !== 204) throw new Error(status.toString());
      await updateContent();
      setIsSubmitting(false);
      setParentId(1);
      setCommentText('');
    } catch (error) {
      setIsSubmitting(true);
      console.log('error in sending comment', error);
    }
  };

  const handleLike = async (
    CommentId: number,
    voted: boolean,
    like: boolean
  ) => {
    try {
      if (voted) {
        if (source === 'post') {
          await ContentApi.removeLikeOrDislike(0, CommentId);
        } else {
          await CaseApi.removeLikeOrDislike(CommentId);
        }
      } else {
        if (source === 'post') {
          await ContentApi.likeContent(0, CommentId, like ? 1 : 0);
        } else {
          await CaseApi.likeContent(CommentId, like ? 1 : 0);
        }
      }
    } catch (error) {
      console.log('error in comment like', error);
    }
  };

  const renderLoading = () => {
    return (
      <LoadingWrapprer>
        <BeatLoader sizeUnit="rem" size={1} color="#5498a9" loading />
      </LoadingWrapprer>
    );
  };

  const buildCommentTree = (cm: any, level: number = 1) => {
    return (
      <Comment key={cm.CommentId} title={level.toString()}>
        <CommentItem
          handleLike={(CommentId, voted, like) =>
            handleLike(CommentId, voted, like)
          }
          cm={cm}
          level={level}
          goToProfile={CommentWrittenId =>
            goToProfile && goToProfile(CommentWrittenId)
          }
          onReply={(parentId: number) => onReply(parentId)}
        />
        {cm.ReplyComment.map((cm: any) => buildCommentTree(cm, level + 1))}
      </Comment>
    );
  };

  return (
    <div>
      {/* <Close>
        <IoIosClose onClick={onClose} size={50} />
      </Close> */}
      {comments && comments.length > 0 && (
        <CommentWrapper>
          <Title>Comments</Title>
          {comments.map((cm: any) => buildCommentTree(cm, 1))}
        </CommentWrapper>
      )}

      {isSubmitting && renderLoading()}

      <CommentForm>
        <StyledInput
          ref={element => setInputText(element)}
          type="text"
          placeholder="Write a Comment"
          value={commentText}
          onChange={event => setCommentText(event.target.value)}
        />
        <SendButton onClick={() => onSubmit(parentId)}>
          <MdSend color="#444" size={30} />
        </SendButton>
      </CommentForm>
    </div>
  );
};

export default Comments;
