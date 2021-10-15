import { Button, Card } from 'react-bootstrap';
import sanitizeHtml from 'sanitize-html';
import React from 'react';
import { CommentInterface } from '../../features/comments/slice';
import styles from './Story.module.scss';
import DelimiterVertical from '../../components/DelimiterVertical';
import { ID, IDs } from '../../types';
import type { StateInterface } from './index';


const renderComments = (comments: CommentInterface[], kids: IDs = []) => {
  if (!kids) return null;

  return kids.map((id: ID) => {
    const comment = comments.find((c) => c.id === id);

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return comment && <Comment comment={comment} comments={comments} />;
  });
};

interface PropsInterface {
  comment: CommentInterface;
  comments: any[];
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
  // eslint-disable-next-line react/require-default-props
  rootCommentsState?: StateInterface;
}

export function Comment(props: PropsInterface) {
  const {
    comments, comment, onClick, rootCommentsState,
  } = props;

  return (
    <Card bg="light" className="mb-3">
      <Card.Body>
        <Card.Subtitle className={`text-muted ${styles.comment__header}`}>
          {comment.by}
          <DelimiterVertical />
          {(new Date(comment.time)).toLocaleString('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          <DelimiterVertical />
          {rootCommentsState && (
            <Button
              variant="link"
              className="text-decoration-none"
              size="sm"
              onClick={onClick}
            >
              [
              {rootCommentsState[comment.id] ? 'hide answers' : 'show answers'}
              ]
            </Button>
          )}
        </Card.Subtitle>
        <Card.Text
          className="mt-2"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(comment.text) }}
        />
        {renderComments(comments, comment?.kids)}
      </Card.Body>
    </Card>
  );
}
