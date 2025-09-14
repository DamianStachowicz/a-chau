import { MenuSubsection } from './subsection.interface';

export interface MenuSection {
  id: string;
  name: string;
  description?: string;
  subsections: MenuSubsection[];
}
