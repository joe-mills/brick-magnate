import { PageSources } from './state/page.reducer';
export interface LoadedPage {
  source: PageSources;

  pageIndex: number;
  ids: any[];
}
export class PageQuery {
  source: PageSources;
  page: number;
  pageSize: number;
  totalRecords: number;
  sort?: string;
  sortDir?: string;
  filters?: any;
  constructor(source: PageSources) {
    this.source = source;
    this.page = 0;
    this.pageSize = 2;
  }
}
