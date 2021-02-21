import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Recipe} from 'src/models/recipe';
import {RecipeRestService} from 'src/app/components/services/recipes/recipe-rest.service';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {EventService} from 'src/app/components/services/events/event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {merge, observable, Observable, of, zip} from 'rxjs';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {catchError, map, mergeMap, takeLast} from 'rxjs/operators';
import {RecipeActionService} from 'src/app/components/services/recipe-actions/recipe-action.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent implements AfterViewInit, OnInit {
  recipesDataSource = new MyDataSource(this.recipeRest, this.eventService, this.snackBar);
  recipes: Recipe[] = [];
  filterControl = new FormControl('');
  opened = true;

  constructor(private router: Router,
              private recipeRest: RecipeRestService,
              private eventService: EventService,
              private snackBar: MatSnackBar,
              public recipeAction: RecipeActionService) {
  }

  ngOnInit(): void {
    this.filterControl.valueChanges.subscribe((value: string) => {
      this.recipesDataSource.filterChangedEvent.emit(value);
    });
  }

  ngAfterViewInit(): void {
    this.eventService.recipeListChanged.emit();
  }
}

export class MyDataSource extends DataSource<Recipe> {
  filterChangedEvent = new EventEmitter<string>();

  constructor(private recipeRest: RecipeRestService,
              private eventService: EventService,
              private snackBar: MatSnackBar) {
    super();
  }

  data: Recipe[] = [];
  filter = '';

  connect(collectionViewer: CollectionViewer): Observable<Recipe[]> {
    const filterObservable = this.filterChangedEvent.pipe(mergeMap(value => {
      this.filter = value;
      return of(this.data.filter(x => new RegExp(this.filter, 'i').test(x.name)));
    }));
    const loadObservable = this.eventService.recipeListChanged.pipe(
      mergeMap(_ => this.recipeRest.getAll()),
      mergeMap(data => {
        this.data = data;
        return of(this.data.filter(x => new RegExp(this.filter, 'i').test(x.name)));
      }),
      catchError(_ => {
        this.snackBar.open('A recipe list hasn\'t been loaded correctly. Reload page to try load it again.', undefined, {duration: 2000});
        return of([]);
      }));
    // return merge(filterObservable, loadObservable).pipe(takeLast(1)); TODO - fix
    return loadObservable;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }
}
