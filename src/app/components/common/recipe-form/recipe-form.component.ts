import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Ingredient} from 'src/models/ingredient';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {NewIngredientDialogComponent} from 'src/app/components/common/recipe-form/new-ingredient-dialog/new-ingredient-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RecipeRestService} from 'src/app/components/services/recipes/recipe-rest.service';
import {Recipe} from 'src/models/recipe';
import {EventService} from 'src/app/components/services/events/event.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  @Input() isEdit?: boolean;
  private id: string | undefined;

  nameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]);
  timeControl = new FormControl('', [Validators.required, Validators.min(1)]);
  descriptionControl = new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(255)]);

  displayedColumns = ['name', 'quantity', 'edit'];
  ingredientsDataSource = new MatTableDataSource<Ingredient>();

  constructor(private matDialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar,
              private recipeRestService: RecipeRestService,
              private eventService: EventService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.route.params.subscribe(params => {
        if (params.id != null) {
          this.recipeRestService.get(params.id).subscribe(
            next => {
              this.nameControl.setValue(next.name);
              this.timeControl.setValue(next.preparationTimeInMinutes);
              this.descriptionControl.setValue(next.description);
              this.ingredientsDataSource.data = next.ingredients;
              this.id = next._id;
            }
          );
        } else {
          this.recipeRestService.displayLoadError();
        }
      }, _ => this.recipeRestService.displayLoadError());
    }
  }

  addNewIngredient(): void {
    this.matDialog.open(NewIngredientDialogComponent).afterClosed().subscribe((value: Ingredient) => {
      if (value != null) {
        this.ingredientsDataSource.data = [...this.ingredientsDataSource.data, value];
      }
    });
  }

  editIngredient(ingredient: Ingredient, i: number): void {
    this.matDialog.open(NewIngredientDialogComponent, {data: {isEdit: true, current: ingredient}})
      .afterClosed().subscribe((value: Ingredient) => {
      if (value != null) {
        this.ingredientsDataSource.data[i] = value;
        this.ingredientsDataSource.data = [...this.ingredientsDataSource.data];
      }
    });
  }

  deleteIngredient(i: number): void {
    this.ingredientsDataSource.data.splice(i, 1);
    this.ingredientsDataSource.data = [...this.ingredientsDataSource.data];
  }

  saveRecipe(): void {
    const newRecipe = new Recipe(
      this.nameControl.value, this.timeControl.value, this.descriptionControl.value, this.ingredientsDataSource.data);
    const observable = this.isEdit ? this.recipeRestService.update(newRecipe, this.id as string) : this.recipeRestService.create(newRecipe);
    observable.subscribe(next => {
      this.snackBar.open('Recipe has been correctly saved! :)', undefined, {
        duration: 2000
      });
      this.eventService.recipeListChanged.emit();
      this.router.navigateByUrl(`/details/${next?._id ?? this.id}`);
    }, _ => {
      this.snackBar.open('Something has gone wrong, try again... :(', undefined, {
        duration: 2000
      });
    });
  }

  isInvalid(): boolean {
    return this.nameControl.invalid || this.descriptionControl.invalid || this.timeControl.invalid
      || this.ingredientsDataSource.data.length < 2;
  }

  cancelRecipe(): void {
    this.snackBar.open('Recipe edition has been canceled', undefined, {
      duration: 2000,
    });
    this.router.navigateByUrl('/');
  }
}
