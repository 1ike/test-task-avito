import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import sanitizeHtml from 'sanitize-html';
import { isEmpty } from 'lodash';

import styles from './Story.module.scss';
import { useTitle, useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetNewStoriesQuery } from '../../features/story';
import {
  fetchComments, selectStoryComments, CommentsStateInterface, selectStoryCommentsQty,
} from '../../features/comments/slice';
import DelimiterVertical from '../../components/DelimiterVertical';


function Index() {
  const { id } = useParams<{ id: string }>();
  useTitle(() => `title ${id}`, [id]);

  const { story } = useGetNewStoriesQuery(
    undefined,
    {
      selectFromResult: ({ data }) => ({ story: data?.find((item) => item.id === Number(id)) }),
    },
  );

  const rootCommentIds: string[] = React.useMemo(() => story.kids || [], [story]);
  // const expandRootCommentInitialState = rootCommentIds
  //   .map((commentId:string) => ({ [commentId]: false }));
  // const [commentsState, setCommentsState] = React.useState(expandRootCommentInitialState);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchComments(rootCommentIds));
  }, [dispatch, rootCommentIds]);
  const { ids, entities: rootComments }: CommentsStateInterface = useAppSelector(
    (state) => selectStoryComments(state, rootCommentIds),
  );
  const commentsQty: number = useAppSelector(
    (state) => selectStoryCommentsQty(state, rootCommentIds),
  );

  console.log('rootComments = ', rootComments);
  return (
    <div className="container pt-2">
      <h1 className="mt-4 mb-4">{story.title}</h1>
      <dl className="row">
        <dt className="col-sm-1">link</dt>
        <dd className="col-sm-11">{story.url}</dd>

        <dt className="col-sm-1">Author</dt>
        <dd className="col-sm-11">{story.by}</dd>

        <dt className="col-sm-1">Date</dt>
        <dd className="col-sm-11">{story.time}</dd>
      </dl>
      {isEmpty(rootComments) ? null : (
        <>
          <h2 className="mt-5 mb-4">
            Comments (
            {commentsQty}
            )
          </h2>
          {ids.map((commentId: string) => (
            <Card bg="light" key={commentId} className="mb-3">
              <Card.Body>
                <Card.Subtitle className={`text-muted ${styles.comment__header}`}>
                  {rootComments[commentId].by}
                  <DelimiterVertical />
                  {(new Date(rootComments[commentId].time)).toLocaleString('en', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  <DelimiterVertical />
                  <Button variant="link" className="text-decoration-none" size="sm">[show answers]</Button>
                </Card.Subtitle>
                <Card.Text
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(rootComments[commentId].text) }}
                />
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

export default Index;
