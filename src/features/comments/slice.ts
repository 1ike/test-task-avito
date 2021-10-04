import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

import commentAPI from './API';
import type { RootState } from '../../app/store';


export const fetchComments = createAsyncThunk('comments/fetchAll', async (commentIds: string[]) => {
  const comments = await commentAPI.fetchByIds(commentIds);
  console.log('comments = ', comments);
  return comments;
});

const commentsAdapter = createEntityAdapter<any>();
const initialState = commentsAdapter.getInitialState();

export const slice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, commentsAdapter.upsertMany);
  },
});

const { reducer } = slice;
export default reducer;

export const {
  selectById: selectCommentById,
  selectIds: selectCommentIds,
  selectEntities: selectCommentEntities,
  selectAll: selectAllComments,
  selectTotal: selectTotalComments,
} = commentsAdapter.getSelectors((state: RootState) => state.comments);

export const selectStoryComments = (state: RootState) => state.comments;
