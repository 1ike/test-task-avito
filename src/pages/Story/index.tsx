import React from 'react';
import { useParams } from 'react-router-dom';

import './Story.css';
import { useTitle, useAppDispatch, useAppSelector } from '../../app/hooks';
import { useGetNewStoriesQuery } from '../../features/story';
import { fetchComments, selectStoryComments } from '../../features/comments/slice';


function Index() {
  const { id } = useParams<{ id: string }>();
  useTitle(() => `title ${id}`, [id]);

  const { story } = useGetNewStoriesQuery(
    undefined,
    {
      selectFromResult: ({ data }) => ({ story: data?.find((item) => item.id === Number(id)) }),
    },
  );

  const rootCommentIds = React.useMemo(() => story.kids || [], [story]);
  // const expandRootCommentInitialState = rootCommentIds
  //   .map((commentId:string) => ({ [commentId]: false }));
  // const [commentsState, setCommentsState] = React.useState(expandRootCommentInitialState);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchComments(rootCommentIds));
  }, [dispatch, rootCommentIds]);
  const { ids, entities: rootComments } = useAppSelector(selectStoryComments);

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
      <h2 className="mt-4 mb-4">
        Comments (
        {/* {commentsQty} */}
        )
        {ids.map((commentId) => (
          <div key={commentId}>
            <p>
              id =
              {rootComments[commentId].id}
            </p>
            <p>{rootComments[commentId].by}</p>
            <p>{rootComments[commentId].text}</p>
            <p>{rootComments[commentId].time}</p>

          </div>
        ))}
      </h2>
    </div>
  );
}

export default Index;
