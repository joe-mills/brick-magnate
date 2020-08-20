import { createAction, props } from '@ngrx/store';
import { LoadedPage, PageQuery } from 'src/app/page/page-query';
import { PageSources } from './page.reducer';

export const changePage = createAction(
  '[Table] Change Page',
  props<{ pageQuery: PageQuery }>()
);

export const changeSort = createAction(
  '[Table] Change Sort',
  props<{ pageQuery: PageQuery }>()
);

export const changeFilters = createAction(
  '[Filters] Change Filters',
  props<{ pageQuery: PageQuery; skipClearFields?: string[] }>()
);
export const setPage = createAction(
  '[ Pages] Set page',
  props<{ loadedPage: LoadedPage; totalRecords: number }>()
);

export const loadNextPage = createAction(
  '[Table] Load Next Page',
  props<{ pageSource: PageSources }>()
);

export const clearLoadedPages = createAction(
  '[Effect] Clear Loaded Pages',
  props<{ pageSource: PageSources }>()
);
