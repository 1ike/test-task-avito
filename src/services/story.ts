import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
// import { Post, User } from './types';
// import { Story } from './types';


type Story = any;

export const storyApi = createApi({
  reducerPath: 'storyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hacker-news.firebaseio.com/v0/' }),
  endpoints: (builder) => ({
    getNewStories: builder.query<Story[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const idsResult = await fetchWithBQ('newstories.json');
        if (idsResult.error) return { error: idsResult.error as FetchBaseQueryError };

        const ids = idsResult.data as string[];

        const storyPromises = ids.slice(0, 10).map((id) => fetchWithBQ(`item/${id}.json`));

        const results = await Promise.all(storyPromises);
        const error = results.find((result) => result.error);


        return error
          ? { error: error as FetchBaseQueryError }
          : { data: results.map((result) => result.data) as Story[] };
      },
    }),
    // getStoryByName: builder.query<Story, string>({
    //   query: (name) => `story/${name}`,
    // }),
  }),
});


export const { useGetNewStoriesQuery } = storyApi;
