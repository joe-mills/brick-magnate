import { Minifig } from '../minifigs/minifig';
import { Part } from '../parts/part';

export interface Inventory {
  id: number;
  minifigs: Minifig[];
  parts: Part[];
}
