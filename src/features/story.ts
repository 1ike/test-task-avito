import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { HACKER_NEWS_API_URL, STORIES_QTY } from '../app/config';
import { BaseEntityInterface } from '../app/types';

const data: StoryInterface[] = [
  {
    by: 'tosh',
    id: 28723656,
    score: 1,
    time: 1633124228,
    title: 'The False Narrative Around Theranos',
    url: 'http://blog.eladgil.com/2021/09/the-false-narrative-around-theranos.html',
  },
  {
    by: 'dustinmoris',
    id: 28723655,
    score: 1,
    time: 1633124221,
    title: 'Prof Dame Anne Glover: First Minister is wrong to ignore the science on gender',
    url: 'https://www.holyrood.com/news/view,professor-dame-anne-glover-first-minister-is-wrong-to-ignore-the-science-on-gender-identity',
  },
  {
    by: 'ilamont',
    id: 28723651,
    score: 1,
    time: 1633124207,
    title: 'Anonymous posts Taiwan flag, national anthem on China government site',
    url: 'https://www.taiwannews.com.tw/600',
  },
  {
    by: 'infodocket',
    id: 28723593,
    score: 1,
    time: 1633123804,
    title: 'A Primer for Academic Entrepreneurs on Academic-Industrial Partnerships',
    url: 'https://www.nature.com/articles/s41467-021-26103-3',
  },
  {
    by: 'hncurious',
    id: 28723589,
    score: 1,
    time: 1633123787,
    title: 'More food shortages are coming but PLEASE do not panic',
    url: 'https://thetakeout.com/grocery-food-shortages-canned-goods-meat-1847775674',
  },
  {
    by: 'cabbagesauce',
    id: 28723545,
    score: 1,
    time: 1633123488,
    title: 'Sad state of Apple cloud API',
    url: 'https://gdmka.me/sad-state-of-apple-cloud-services/',
  },
  {
    by: 'tossertwenty',
    id: 28723534,
    score: 1,
    text: 'Ok gang, high quality problem time for Friday afternoon<p>I spent &gt;12 years building a company with 2 other co-founders and a lot of investor money<p>We just wrapped up a year long process of getting acquired for unicorn $$$<p>I have a two year earn out that is heavily backend weighted, eg about 75% of my total compensation will be in the last year.<p>The money is &quot;guaranteed&quot; but I am responsible for showing up, driving the company integration, etc<p>Here&#x27;s the rub - I just got finished with my first month of DD, lawyers, compliance meetings, etc.<p>It&#x27;s clear that the next two years of my life are going to be captive to corporate bull@#!t, bizarre power grabs, etc - all the stuff I&#x27;ve spent my life avoiding like the plague by being an entrepreneur<p>Integration to the acquirer meant &quot;fitting a square peg into a round hole&quot;<p>I went into this with open eyes, but it is exhausting and demoralizing<p>I am grateful for the opportunity, I am also old, tired, and ready for a break not two more years of toeing the line :)<p>What have others done in similar situations?',
    time: 1633123428,
    title: 'Ask HN: What do you do with golden handcuffs?',
  },
  {
    by: 'mfiguiere',
    id: 28723527,
    score: 2,
    time: 1633123400,
    title: 'Who Gains and Who Loses from Credit Card Payments?',
    url: 'https://www.bostonfed.org/publications/public-policy-discussion-paper/2010/who-gains-and-who-loses-from-credit-card-payments-theory-and-calibrations.aspx',
  },
  {
    by: 'atombender',
    id: 28723520,
    kids: [
      28723615,
      28723609,
    ],
    score: 7,
    time: 1633123356,
    title: 'Ozy Media Says It Is Shutting Down',
    url: 'https://www.nytimes.com/2021/10/01/business/media/ozy-media.html',
  },
  {
    by: 'eynsham',
    id: 28723508,
    score: 1,
    time: 1633123282,
    title: 'Tom Stevenson on the end of the World Bank’s Doing Business reports',
    url: 'https://www.lrb.co.uk/blog/2021/september/out-of-business',
  },
];


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

        const results = await Promise.all(storyPromises);
        const error = results.find((result) => result.error);

        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 1000);
        });

        return error
          ? { error: error as FetchBaseQueryError }
          // : { data: results.map((result) => result.data) as Story[] };
          : { data };
      },
    }),
  }),
});


export const { useGetNewStoriesQuery } = storyApi;
