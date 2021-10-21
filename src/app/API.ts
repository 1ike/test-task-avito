import { HACKER_NEWS_API_URL } from './config';
import { IDs } from './types';
import type { CommentInterface } from '../features/comments';


const fetchByIds = (commentIds: IDs): Promise<CommentInterface[]> => {
  console.log('commentIds = ', commentIds);
  const promises = commentIds.map((id) => fetch(
    `${HACKER_NEWS_API_URL}item/${id}.json`,
    { method: 'GET' },
  ).then((response) => response.json()));

  return Promise.all(promises);
};

export default {
  fetchByIds,
};
