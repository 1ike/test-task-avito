import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError, FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { HACKER_NEWS_API_URL, STORIES_QTY } from '../app/config';
import { BaseEntityInterface } from '../app/types';
import { transformDate } from '../app/lib';


export interface StoryInterface extends BaseEntityInterface {
  title: string;
  score: number;
  url?: string;
  text?: string;
}

export const storyApi = createApi({
  reducerPath: 'storyApi',
  baseQuery: fetchBaseQuery({ baseUrl: HACKER_NEWS_API_URL }),
  endpoints: (builder) => ({
    getNewStories: builder.query<StoryInterface[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const idsResult = await fetchWithBQ('newstories.json');
        if (idsResult.error) return { error: idsResult.error as FetchBaseQueryError };

        const ids = idsResult.data as string[];

        const storyPromises = ids.slice(0, STORIES_QTY).map((id) => fetchWithBQ(`item/${id}.json`));

        const results = (await Promise.all(storyPromises)) as QueryReturnValue<
          StoryInterface,
          FetchBaseQueryError,
          FetchBaseQueryMeta
          >[];
        const error = results.find((result) => result.error);

        return error
          ? { error: error as FetchBaseQueryError }
          : {
            data: results
              .filter(({ data }) => Boolean(data))
              .map(({ data: story }) => (
                { ...story, time: transformDate(story?.time || 0) })) as StoryInterface[],
          };
      },
    }),
  }),
});


export const { useGetNewStoriesQuery } = storyApi;
