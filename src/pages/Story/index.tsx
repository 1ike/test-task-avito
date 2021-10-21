import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { isEmpty, memoize } from 'lodash';

import { useAppDispatch, useAppSelector, useTitle } from '../../app/hooks';
import { useGetNewStoriesQuery } from '../../features/story';
import {
  CommentInterface,
  fetchComments,
  selectAllComments, selectIsCommentsLoading,
  selectStoryCommentsQty,
} from '../../features/comments/slice';
import { ID, IDs } from '../../types';
import { Comment } from './Comment';
import RefreshButton from '../../components/RefreshButton';
import Layout from '../../components/Layout';
import NavbarComponent from './NavbarComponent';
import { POLLING_INTERVAL } from '../../config';


export interface StateInterface { [id: number]: Boolean }

function Index() {
  const { id } = useParams<{ id: string }>();
  useTitle(() => `title ${id}`, [id]);

  const { story } = useGetNewStoriesQuery(
    undefined,
    {
      selectFromResult: ({ data }) => ({ story: data?.find((item) => item.id === Number(id)) }),
    },
  );

  const rootCommentIds: IDs = React.useMemo(() => story.kids || [], [story]);
  const expandRootCommentInitialState: StateInterface = rootCommentIds
    .reduce((acc, commentId: ID) => ({ ...acc, [commentId]: false }), {});
  const [rootCommentsState, setRootCommentsState] = React.useState(expandRootCommentInitialState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onExpandRootCommentClick = React.useCallback(memoize(
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
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      refreshComments();
      timer = setTimeout(() => {
        refresh();
      }, POLLING_INTERVAL);
    };
    refresh();

    return () => clearTimeout(timer);
  }, [refreshComments]);


  const comments = useAppSelector(selectAllComments);
  const rootComments: any = React.useMemo(
    () => comments.filter((comment) => comment.parent === Number(id)), [id, comments],
  );

  const commentsQty: ID = useAppSelector(
    (state) => selectStoryCommentsQty(state, rootCommentIds),
  );
  const isCommentsLoading: boolean = useAppSelector(selectIsCommentsLoading);

  return (
    <Layout navbarComponent={NavbarComponent}>
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
      </div>
    </Layout>
  );
}

export default Index;
