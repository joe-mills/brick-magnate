import { ListSetting, Sort, Group } from './list-setting';
import { ListFilter } from './list-filter';

export class ProductListSetting implements ListSetting {
  listName: string;
  sort: Sort;
  group: Group;
  listFilters: ListFilter[];

  constructor() {
    this.listName = 'product';
    this.sort = { sortOptions: ['theme, year'], sortBy: 'theme' };
    this.group = { groupOptions: ['theme, year'], groupBy: 'theme' };
  }
}
