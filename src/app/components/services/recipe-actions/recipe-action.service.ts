import {Injectable} from '@angular/core';
import {Recipe} from 'src/models/recipe';
import {DeleteConfirmComponent} from 'src/app/components/common/delete-confirm/delete-confirm.component';
import {EventService} from 'src/app/components/services/events/event.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {RecipeRestService} from 'src/app/components/services/recipes/recipe-rest.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RecipeActionService {

  constructor(private eventService: EventService,
              private router: Router,
              private matDialog: MatDialog,
              private recipeRest: RecipeRestService,
              private snackBar: MatSnackBar) {
  }

  addNewRecipe(): void {
    this.eventService.openSidenav.emit(false);
    this.router.navigateByUrl('/add-recipe');
  }

  deleteRecipe(recipe: Recipe): void {
    this.matDialog.open(DeleteConfirmComponent).afterClosed().subscribe(value => {
      if (value === true) {
        this.recipeRest.delete(recipe._id as string).subscribe(next => {
          this.snackBar.open('Recipe has been deleted.', undefined, {duration: 2000});
          this.eventService.recipeListChanged.emit();
          this.eventService.openSidenav.emit(true);
          this.router.navigateByUrl('/');
        }, _ => {
          this.snackBar.open('Recipe has not been deleted, try again.', undefined, {duration: 2000});
        });
      }
    });
  }

  editRecipe(recipe: Recipe): void {
    this.eventService.openSidenav.emit(false);
    this.router.navigateByUrl(`/edit-recipe/${recipe._id}`);
  }

  showRecipe(recipe: Recipe): void {
    this.eventService.openSidenav.emit(false);
    this.router.navigateByUrl(`/details/${recipe._id}`);
  }
}
