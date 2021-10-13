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
  const fetchAllComments = async (
    commentsAcc: CommentInterface[], ids:string[],
  ): Promise<CommentInterface[]> => {
    if (ids.length === 0) return commentsAcc;

    const comments = await commentAPI.fetchByIds(ids);
    const filteredComments = comments.filter((comment) => !comment.deleted);
    const childrenIds = filteredComments.reduce(
      (acc, comment) => (comment.kids?.length > 0 ? [...acc, ...comment.kids] : acc),
      [],
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
  (_: RootState, rootCommentIds: string[]) => rootCommentIds,
  (commentEntities: any, rootCommentIds) => {
    // console.log('comments = ', commentEntities);
    const entities = rootCommentIds.reduce(
      (acc, id) => (commentEntities[id] ? { ...acc, [id]: commentEntities[id] } : acc),
      {},
    );
    // console.log('entities = ', entities);
    return { ids: rootCommentIds, entities };
  },
);
export const selectStoryCommentsQty = createSelector(
  selectCommentEntities,
  (_: RootState, rootCommentIds: string[]) => rootCommentIds,
  (commentEntities: any, rootCommentIds) => {
    const filterDeleted = (id: string) => commentEntities[id] && !commentEntities[id]?.deleted;

    const filteredCommentsFilteredIds = rootCommentIds.filter(filterDeleted);

    console.log('commentEntities = ', commentEntities);
    console.log('rootCommentIds = ', rootCommentIds);
    console.log('filteredCommentsFilteredIds = ', filteredCommentsFilteredIds);

    const getCommentsQty = (acc: number, ids: string[]): number => {
      if (ids.length === 0) return acc;

      const childrenIds = ids.reduce(
        (idsAcc: string[], id: string) => {
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
