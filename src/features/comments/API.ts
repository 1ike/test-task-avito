import { HACKER_NEWS_API_URL } from '../../config';


const fetchByIds = (commentIds: number[]) => {
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
