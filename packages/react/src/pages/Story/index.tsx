import React, {
  useCallback, useMemo, useState, ReactNode,
} from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty, memoize } from 'lodash';
import { Alert, Spinner } from 'react-bootstrap';

import sanitizeHtml from 'sanitize-html';
import { useAppDispatch, useAppSelector, useTitle } from '../../app/hooks';
import { StoryInterface, useGetNewStoriesQuery } from '../../features/story';
import {
  CommentInterface,
  fetchComments,
  selectAllComments, selectIsCommentsLoading,
  selectStoryCommentsQty,
} from '../../features/comment';
import { ID, IDs } from '../../app/types';
import { Comment } from './Comment';
import RefreshButton from '../../components/RefreshButton';
import Layout from '../../components/Layout';
import NavbarComponent from './NavbarComponent';
import { POLLING_INTERVAL } from '../../app/config';
import styles from './Story.module.scss';
import API from '../../app/API';
import { formatDate } from '../../app/lib';


const ContentWrapper = ({ children }: { children: ReactNode }) => (
  <Layout navbarComponent={NavbarComponent}>
    <div className="container pt-2">
      {children}
    </div>
  </Layout>
);

export interface StateInterface { [id: number]: Boolean }

function Story() {
  const { id: idFromParams } = useParams<{ id: string }>();
  const id = Number(idFromParams);

  useTitle(() => `title ${id}`, [id]);

  const { story: cachedStory } = useGetNewStoriesQuery(
    undefined,
    {
      selectFromResult: ({ data }) => ({ story: data?.find((item) => item.id === id) }),
    },
  );

  const [story, setStory] = useState(cachedStory);
  const [storyError, setStoryError] = useState(null);

  const rootCommentIds: IDs = useMemo(() => story?.kids || [], [story]);
  const expandRootCommentInitialState: StateInterface = rootCommentIds
    .reduce((acc, commentId: ID) => ({ ...acc, [commentId]: false }), {});
  const [rootCommentsState, setRootCommentsState] = useState(expandRootCommentInitialState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onExpandRootCommentClick = useCallback(memoize(
    (commentId: ID) => () => setRootCommentsState(
      (prevState) => ({ ...prevState, [commentId]: !prevState[commentId] }),
    ),
  ),
  []);


  const dispatch = useAppDispatch();
  const refreshComments = useCallback(
    () => dispatch(fetchComments(rootCommentIds)),
    [dispatch, rootCommentIds],
  );

  React.useEffect(() => {
    if (!story) {
      API.fetchByIds([id])
        .then(([s]) => setStory(s as StoryInterface))
        .catch((error) => {
          setStoryError(error.message);
          console.error('Log somewhere error', error);
        });

      return undefined;
    }

    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      refreshComments();
      timer = setTimeout(() => {
        refresh();
      }, POLLING_INTERVAL);
    };
    refresh();

    return () => clearTimeout(timer);
  }, [refreshComments, story, id]);


  const comments = useAppSelector(selectAllComments);
  const rootComments: CommentInterface[] = React.useMemo(
    () => comments.filter((comment) => comment.parent === Number(id)), [id, comments],
  );

  const commentsQty: ID = useAppSelector(
    (state) => selectStoryCommentsQty(state, rootCommentIds),
  );
  const isCommentsLoading: boolean = useAppSelector(selectIsCommentsLoading);

  if (!story) {
    return (
      <ContentWrapper>
        <div className={styles['story--loading']}>
          { storyError
            ? (
              <Alert variant="danger">
                {`Something goes wrong: \u00A0${storyError}`}
                <br />
                <br />
                Try to refresh the page.
              </Alert>
            )
            : <Spinner animation="border" variant="primary" />}
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>
      <h1 className="mt-4 mb-4">{story.title}</h1>
      <dl className="row">
        <dt className="col-sm-1">Author</dt>
        <dd className="col-sm-11">{story.by}</dd>

        <dt className="col-sm-1">Date</dt>
        <dd className="col-sm-11">{formatDate(story.time)}</dd>

        {story.url && (
          <>
            <dt className="col-sm-1">link</dt>
            <dd className="col-sm-11"><a href={story.url}>{story.url}</a></dd>
          </>
        )}

        {/* eslint-disable react/no-danger */
          story.text && (
            <>
              <dt className="col-sm-1">Text</dt>
              <dd
                className="col-sm-11"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(story.text) }}
              />
            </>
          )
          /* eslint-enable react/no-danger */
        }

      </dl>
      {isEmpty(rootComments) ? null : (
        <>
          <div className="d-flex align-items-center mt-5 mb-4">
            <h2>
              Comments (
              {commentsQty}
              )
            </h2>
            <RefreshButton
              onClick={refreshComments}
              disabled={isCommentsLoading}
              tooltipText="Refresh comments"
            />
          </div>
          {rootComments.map((comment: CommentInterface) => (
            <Comment
              key={comment.id}
              comment={comment}
              onClick={onExpandRootCommentClick(comment.id)}
              rootCommentsState={rootCommentsState}
              comments={comments}
            />
          ))}
          {}
        </>
      )}
    </ContentWrapper>
  );
}

export default Story;
