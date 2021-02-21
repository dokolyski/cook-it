import {Ingredient} from 'src/models/ingredient';

export class Recipe {
  _id: string | undefined;
  name: string;
  preparationTimeInMinutes: number;
  description: string;
  ingredients: Ingredient[];


  constructor(name: string, preparationTimeInMinutes: number, description: string, ingredients: Ingredient[]) {
    this.name = name;
    this.preparationTimeInMinutes = preparationTimeInMinutes;
    this.description = description;
    this.ingredients = ingredients;
  }
}
