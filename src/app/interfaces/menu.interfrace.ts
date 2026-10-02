export interface MenuVariant {
  id: string;
  name: string;
  description?: string;
  price?: number;
  vegetarian?: boolean;
  spicyness?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  vegetarian?: boolean;
  spicyness?: boolean;
  variants?: MenuVariant[];
}

export interface MenuSubsection {
  id: string;
  name?: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuSection {
  id: string;
  name: string;
  description?: string;
  subsections: MenuSubsection[];
}

export interface Menu {
  annotation: string;
  sections: MenuSection[];
}
