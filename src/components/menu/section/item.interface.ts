export interface Item {
  id: string;
  name: string;
  description?: string;
  price?: number;
  variants?: Item[];
  vegetarian?: boolean;
  spicyness: number; // 1-3
}
