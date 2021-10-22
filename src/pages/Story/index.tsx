import React, {
  useCallback, useMemo, useState, ReactNode,
} from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty, memoize } from 'lodash';

import { Spinner } from 'react-bootstrap';

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


const ContentWrapper = ({ children }: { children: ReactNode }) => (
  <Layout navbarComponent={NavbarComponent}>
    <div className="container pt-2">
      {children}
    </div>
  </Layout>
);

export interface StateInterface { [id: number]: Boolean }

function Index() {
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
      // setTimeout(() => setStory({
      //   by: 'atombender',
      //   id: 28723520,
      //   kids: [
      //     28723615,
      //     28723609,
      //   ],
      //   score: 7,
      //   time: 1633123356,
      //   title: 'Ozy Media Says It Is Shutting Down',
      //   url: 'https://www.nytimes.com/2021/10/01/business/media/ozy-media.html',
      // }),
      // 1000);
      API.fetchByIds([id]).then(([s]) => setStory(s as StoryInterface));

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
  const rootComments: any = React.useMemo(
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
          <Spinner animation="border" variant="primary" />
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper>

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

export default Index;
