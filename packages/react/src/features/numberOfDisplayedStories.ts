import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../app/store';
import { STORIES_QTY_PER_PAGE } from '../app/config';


export const numberOfDisplayedStoriesName = 'numberOfDisplayedStories';
export const slice = createSlice({
  name: numberOfDisplayedStoriesName,
  initialState: {
    qty: STORIES_QTY_PER_PAGE,
  },
  /* eslint-disable no-param-reassign */
  reducers: {
    increaseNumberOfDisplayedStories: (state) => {
      state.qty += STORIES_QTY_PER_PAGE;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { increaseNumberOfDisplayedStories } = slice.actions;

const { reducer } = slice;
export default reducer;

export const selectNumberOfDisplayedStories = (
  state: RootState,
) => state[numberOfDisplayedStoriesName].qty;
