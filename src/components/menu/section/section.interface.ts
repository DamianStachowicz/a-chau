import { Item } from './item.interface';

export interface MenuSection {
  id: string;
  name: string;
  description?: string;
  items: Item[];
}
