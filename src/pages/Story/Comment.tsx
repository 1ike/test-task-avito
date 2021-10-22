import { Button, Card } from 'react-bootstrap';
import sanitizeHtml from 'sanitize-html';
import React from 'react';

import classNames from 'classnames';
import { CommentInterface } from '../../features/comment';
import styles from './Story.module.scss';
import DelimiterVertical from '../../components/DelimiterVertical';
import { ID, IDs } from '../../app/types';
import type { StateInterface } from './index';
import { formatDate } from '../../app/lib';


const renderComments = (comments: CommentInterface[], expand: Boolean, kids: IDs = []) => {
  if (!kids) return null;

  return kids.map((id: ID) => {
    const comment = comments.find((c) => c.id === id);

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return comment && <Comment comment={comment} expand={expand} comments={comments} />;
  });
};

interface PropsInterface {
  comment: CommentInterface;
  comments: CommentInterface[];
  // eslint-disable-next-line react/require-default-props
  expand?: Boolean;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
  // eslint-disable-next-line react/require-default-props
  rootCommentsState?: StateInterface;
}

export function Comment(props: PropsInterface) {
  const {
    comments, comment, onClick, rootCommentsState, expand: expandComment,
  } = props;

  const isRootCommentHasChildren = rootCommentsState
    && comments.some((c) => c.parent === comment.id);

  const expand = expandComment || (isRootCommentHasChildren && rootCommentsState?.[comment.id]);

  return (
    <Card
      bg="light"
      className={classNames(
        'mb-3',
        { 'ms-4 mt-3': !rootCommentsState },
      )}
    >
      <Card.Body>
        <Card.Subtitle className={`text-muted ${styles.comment__header}`}>
          {comment.by}
          <DelimiterVertical />
          {formatDate(comment.time)}
          {isRootCommentHasChildren && (
            <>
              <DelimiterVertical />
              <Button
                variant="link"
                className="text-decoration-none"
                size="sm"
                onClick={onClick}
              >
                [
                {expand ? 'hide answers' : 'show answers'}
                ]
              </Button>
            </>
          )}
        </Card.Subtitle>
        <Card.Text
          className="mt-2"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(comment.text) }}
        />
        {expand && renderComments(comments, expand, comment?.kids)}
      </Card.Body>
    </Card>
  );
}
