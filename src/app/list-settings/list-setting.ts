import { ListFilter } from './list-filter';

export interface ListSetting {
  listName: string;
  sort: Sort;
  group: Group;
  listFilters: ListFilter[];
}

export interface Sort {
  sortOptions: string[];
  sortBy: string;
}

export interface Group {
  groupOptions: string[];
  groupBy: string;
}
