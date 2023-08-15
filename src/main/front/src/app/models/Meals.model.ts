import { Types } from './Types.model';

export interface Meals {
  id: number;
  name: string;
  type: Types;
  ingredients: string;
  recipe: string;
  imgUrl: string;
}
