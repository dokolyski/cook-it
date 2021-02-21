import { Pipe, PipeTransform } from '@angular/core';
import {Ingredient} from 'src/models/ingredient';

@Pipe({
  name: 'ingredient'
})
export class IngredientFormatterPipe implements PipeTransform {

  transform(ingredient: Ingredient): string {
    return `${ingredient.name} - ${ingredient.quantity}`;
  }

}
