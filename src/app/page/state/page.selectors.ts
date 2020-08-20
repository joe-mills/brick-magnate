import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PageQuery } from '../page-query';
import * as fromPage from './page.reducer';
import { PageState } from './page.reducer';

export const selectPageState = createFeatureSelector<PageState>('page');

export const selectPages = createSelector(selectPageState, fromPage.selectAll);
export const selectPageEntities = createSelector(
  selectPageState,
  fromPage.selectEntities
);
export const selectPageBySource = (source: fromPage.PageSources) =>
  createSelector(selectPageEntities, (entities) => {
    const page = entities[source];

    if (page) {
      return page;
    } else {
      return new PageQuery(source);
    }
  });

export const selectUnloadedPageBySource = (source: fromPage.PageSources) =>
  createSelector(
    selectPageState,
    selectPageBySource(source),

    (state, page) => {
      if (page) {
        const loadedPage = state.loadedPages.find(
          (x) => x.source === source && +x.pageIndex === +page.page
        );
        if (!loadedPage) {
          return page;
        }
      }
    }
  );
export const selectTotalRecordsBySource = (source: fromPage.PageSources) =>
  createSelector(selectPageBySource(source), (page) => page.totalRecords);
export const selectPageIndexBySource = (source: fromPage.PageSources) =>
  createSelector(selectPageBySource(source), (page) => page.page);
export const selectPageSizeBySource = (source: fromPage.PageSources) =>
  createSelector(selectPageBySource(source), (page) => page.pageSize);
export const selectLoadedPage = (
  source: fromPage.PageSources,
  pageIndex: number
) =>
  createSelector(selectPageState, (state) =>
    state.loadedPages.find(
      (x) => x.source === source && +x.pageIndex === +pageIndex
    )
  );
export const selectCurrentLoadedPage = (source: fromPage.PageSources) =>
  createSelector(
    selectPageState,
    selectPageIndexBySource(source),
    (state: PageState, pageIndex: number) => {
      return state.loadedPages.find(
        (x) => x.source === source && +x.pageIndex === +pageIndex
      );
    }
  );
