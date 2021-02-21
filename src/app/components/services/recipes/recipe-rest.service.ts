import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from 'src/models/recipe';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RecipeRestService {

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router: Router,
              @Inject('url') @Optional() public url: string) {
  }

  getAll(): Observable<Recipe[]> {
    return this.http.get(this.url, {}) as Observable<Recipe[]>;
  }

  get(id: string): Observable<Recipe> {
    return this.http.get(`${this.url}/${id}`, {}) as Observable<Recipe>;
  }

  create(newRecipe: Recipe): Observable<any> {
    return this.http.post(this.url, newRecipe);
  }

  update(recipe: Recipe, id: string): Observable<any> {
    return this.http.put(`${this.url}/${id}`, recipe);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  displayLoadError(): void {
    this.snackBar.open('Chosen recipe has not been loaded properly. Click it once more to try again.', undefined, {
      duration: 2000
    });
    this.router.navigateByUrl('/');
  }
}
