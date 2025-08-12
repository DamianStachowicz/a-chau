export interface Item {
  id: string;
  name: string;
  description?: string;
  price?: number;
  variants?: Item[];
  vegetarian?: boolean;
  spicyness?: number; // 0-3, where 0 means not spicy
}
