import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
// import counterReducer from '../features/counter/counterSlice';
import { storyApi } from '../services/story';

export const store = configureStore({
  reducer: { [storyApi.reducerPath]: storyApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storyApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
