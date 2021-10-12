import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import commentAPI from './API';
import type { RootState } from '../../app/store';

type CommentInterface = any;
export interface CommentsStateInterface {
  ids: string[];
  entities: { [id: string]: CommentInterface };
}

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


export const selectStoryComments = createSelector(
  selectCommentEntities,
  (_: RootState, rootCommentIds: string[]) => rootCommentIds,
  (commentEntities: any, rootCommentIds) => {
    console.log('comments = ', commentEntities);
    const entities = rootCommentIds.reduce(
      (acc, id) => (commentEntities[id] ? { ...acc, [id]: commentEntities[id] } : acc),
      {},
    );
    console.log('entities = ', entities);
    return { ids: rootCommentIds, entities };
  },
);
