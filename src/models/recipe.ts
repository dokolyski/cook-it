import {Ingredient} from 'src/models/ingredient';

export class Recipe {
  _id: string;
  name: string;
  preparationTimeInMinutes: number;
  description: string;
  ingredients: Ingredient[];


  constructor(id: string, name: string, preparationTimeInMinutes: number, description: string, ingredients: Ingredient[]) {
    this._id = id;
    this.name = name;
    this.preparationTimeInMinutes = preparationTimeInMinutes;
    this.description = description;
    this.ingredients = ingredients;
  }
}
