import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import type { RootState, AppDispatch } from './store';


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


type TitleOrFnType = string | (() => string);
export const useTitle = (titleOrFn: TitleOrFnType, deps: any[] = []) => {
  useEffect(
    () => {
      document.title = typeof titleOrFn === 'function' ? titleOrFn() : titleOrFn;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  );
};
