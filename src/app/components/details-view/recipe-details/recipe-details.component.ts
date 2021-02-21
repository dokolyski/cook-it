import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeRestService} from 'src/app/components/services/recipes/recipe-rest.service';
import {Recipe} from 'src/models/recipe';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RecipeActionService} from 'src/app/components/services/recipe-actions/recipe-action.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(private route: ActivatedRoute,
              private recipeRestService: RecipeRestService,
              private ref: ChangeDetectorRef,
              public recipeAction: RecipeActionService
) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id != null) {
        this.recipeRestService.get(params.id).subscribe(
          next => {
            this.recipe = next;
            this.ref.markForCheck();
          });
      } else {
        this.recipeRestService.displayLoadError();
      }
    }, _ => this.recipeRestService.displayLoadError());
  }



}
