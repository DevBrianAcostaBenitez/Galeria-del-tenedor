import { Types } from './Types.model';

export interface Meals {
  id?: number;
  name: string;
  type?: Types | null;
  ingredients: string;
  recipe: string;
  imgUrl?: string;
}
