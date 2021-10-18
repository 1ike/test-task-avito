import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import commentAPI from './API';
import type { RootState } from '../../app/store';
import { getCommentsByIds } from '../../lib';
import { ID, IDs } from '../../types';


export interface CommentInterface {
  id: ID;
  by: string;
  text: string;
  time: number;
  kids?: IDs;
  parent?: ID;
  deleted?: Boolean;
}

export interface CommentsStateInterface {
  ids: string[];
  entities: { [id: string]: CommentInterface };
}

export const fetchComments = createAsyncThunk('comments/fetchAll', async (commentIds: IDs) => {
  const fetchAllComments = async (
    commentsAcc: CommentInterface[], ids:IDs,
  ): Promise<CommentInterface[]> => {
    if (ids.length === 0) return commentsAcc;

    const comments: CommentInterface[] = await commentAPI.fetchByIds(ids);
    const filteredComments = comments.filter((comment) => !comment.deleted);
    const childrenIds: IDs = filteredComments.reduce(
      (acc, comment) => {
        const { kids = [] } = comment;
        return kids.length > 0 ? [...acc, ...kids] : acc;
      },
      <IDs>[],
    );

    console.log('childrenIds = ', childrenIds);
    return fetchAllComments([...commentsAcc, ...filteredComments], childrenIds);
  };

  return fetchAllComments([], commentIds);
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
  (_: RootState, rootCommentIds: IDs) => rootCommentIds,
  getCommentsByIds,
);
export const selectStoryCommentsQty = createSelector(
  selectCommentEntities,
  (_: RootState, rootCommentIds: IDs) => rootCommentIds,
  (commentEntities: any, rootCommentIds) => {
    const filterDeleted = (id: ID) => commentEntities[id] && !commentEntities[id]?.deleted;

    const filteredCommentsFilteredIds = rootCommentIds.filter(filterDeleted);

    console.log('commentEntities = ', commentEntities);
    console.log('rootCommentIds = ', rootCommentIds);
    console.log('filteredCommentsFilteredIds = ', filteredCommentsFilteredIds);

    const getCommentsQty = (acc: ID, ids: IDs): number => {
      if (ids.length === 0) return acc;

      const childrenIds = ids.reduce(
        (idsAcc: IDs, id: ID) => {
          const kids = commentEntities[id]?.kids?.filter(filterDeleted) || [];
          return kids.length > 0 ? [...idsAcc, ...kids] : idsAcc;
        },
        [],
      );

      return childrenIds.length + getCommentsQty(acc, childrenIds);
    };

    const qty = getCommentsQty(filteredCommentsFilteredIds.length, filteredCommentsFilteredIds);

    return qty;
  },
);
