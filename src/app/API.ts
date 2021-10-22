import { HACKER_NEWS_API_URL } from './config';
import { IDs } from './types';
import { transformDate } from './lib';


const fetchByIds = <T>(ids: IDs): Promise<T[]> => {
  const promises = ids.map((id) => fetch(
    `${HACKER_NEWS_API_URL}item/${id}.json`,
    { method: 'GET' },
  ).then((response) => response.json())
    .then((data) => ({ ...data, time: transformDate(data.time) })));

  return Promise.all(promises);
};

export default {
  fetchByIds,
};
