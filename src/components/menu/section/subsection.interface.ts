import { Item } from './item.interface';

export interface MenuSubsection {
  id: string;
  name?: string;
  description?: string;
  items: Item[];
}
