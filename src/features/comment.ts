import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import API from '../app/API';
import type { RootState } from '../app/store';
import { getCommentsByIds } from '../app/lib';
import { BaseEntityInterface, ID, IDs } from '../app/types';
import { RequestStatus } from './shared';


export interface CommentInterface extends BaseEntityInterface {
  text: string;
  parent?: ID;
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

    const comments: CommentInterface[] = await API.fetchByIds(ids);
    const filteredComments = comments.filter((comment) => !comment.deleted);
    const childrenIds: IDs = filteredComments.reduce(
      (acc, comment) => {
        const { kids = [] } = comment;
        return kids.length > 0 ? [...acc, ...kids] : acc;
      },
      [] as IDs,
    );

    return fetchAllComments([...commentsAcc, ...filteredComments], childrenIds);
  };

  return fetchAllComments([], commentIds);
});

const commentsAdapter = createEntityAdapter<any>();
const initialState = commentsAdapter.getInitialState({
  loading: RequestStatus.Idle,
});

export const slice = createSlice({
  name: 'comments',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      if (state.loading === RequestStatus.Idle) {
        state.loading = RequestStatus.Pending;
      }
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      if (state.loading === RequestStatus.Pending) {
        commentsAdapter.upsertMany(state, action.payload);
        state.loading = RequestStatus.Idle;
      }
    });
  },
  /* eslint-enable no-param-reassign */
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

export const selectIsCommentsLoading = (state: RootState) => (
  state.comments.loading === RequestStatus.Pending
);
