import {
  createEntityAdapter,
  EntityAdapter,
  EntityState,
  Update,
} from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { LoadedPage, PageQuery } from 'src/app/page/page-query';
import * as pageActions from './page.actions';
export enum PageSources {
  PRODUCTS,
  APP,
  PRODUCTSCOLLECTION,
  PRODUCTIMAGES
}
export interface PageState extends EntityState<PageQuery> {
  loadedPages: LoadedPage[];
}
export function selectPageId(page: PageQuery): PageSources {
  return page.source;
}
export const adapter: EntityAdapter<PageQuery> = createEntityAdapter<PageQuery>(
  { selectId: selectPageId }
);
export const initialState: PageState = adapter.getInitialState({
  loadedPages: [],
});

const pageReducer = createReducer(
  initialState,
  on(pageActions.changePage, (state, { pageQuery }) =>
    adapter.upsertOne(pageQuery, state)
  ),
  on(pageActions.changeSort, (state, { pageQuery }) =>
    adapter.upsertOne(pageQuery, state)
  ),
  on(pageActions.changeFilters, (state, { pageQuery, skipClearFields }) => {
    let clearCache = false;
    let loadedPages = state.loadedPages;
    const currentPageQuery = state.entities[pageQuery.source];

    if (currentPageQuery) {
      if (currentPageQuery.filters) {
        Object.keys(currentPageQuery.filters).forEach((filter) => {
          if (skipClearFields) {
            if (skipClearFields.indexOf(filter) > -1) {
              console.log(' filter ' + filter);

              // return;
            }
          }
          if (!pageQuery.filters.hasOwnProperty(filter)) {
            console.log('missing filter clear : ' + filter);
            clearCache = true;
          } else {
            if (pageQuery.filters[filter] != currentPageQuery.filters[filter]) {
              console.log('different filter clear : ' + filter);
              clearCache = true;
            }
          }
        });
      }
    }
    if (clearCache) {
      console.log('clearing cached pages');

      loadedPages = state.loadedPages.filter(
        (x) => x.source !== pageQuery.source
      );
    }
    return adapter.upsertOne(pageQuery, { ...state, loadedPages });
  }),
  on(pageActions.setPage, (state, { loadedPage, totalRecords }) => {
    const loadedPageIndex = (state.loadedPages || []).findIndex(
      (x) =>
        x.pageIndex === loadedPage.pageIndex && x.source === loadedPage.source
    );
    const loadedPages = state.loadedPages.slice();
    if (loadedPageIndex > -1) {
      loadedPages[loadedPageIndex] = loadedPage;
    } else {
      loadedPages.push(loadedPage);
    }
    const changes: Update<PageQuery> = {
      id: loadedPage.source,
      changes: {
        totalRecords: totalRecords,
      },
    };
    // return { ...state, loadedPages };
    return adapter.updateOne(changes, { ...state, loadedPages: loadedPages });
  }),
  on(pageActions.loadNextPage, (state, { pageSource }) => {
    const currentPage = state.entities[pageSource];
    const changes: Update<PageQuery> = {
      id: pageSource,
      changes: {
        page: (currentPage.page || 1) + 1,
      },
    };
    return adapter.updateOne(changes, { ...state });
  }),
  on(pageActions.clearLoadedPages, (state, { pageSource }) => {
    const filteredPages = state.loadedPages.filter(
      (x) => x.source !== pageSource
    );
    return { ...state, loadedPages: filteredPages };
  })
);
export function reducer(state: PageState | undefined, action: Action) {
  return pageReducer(state, action);
}
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
