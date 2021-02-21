import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { RecipeDetailsComponent } from './components/details-view/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './components/details-view/recipe-edit/recipe-edit.component';
import {RouterModule} from '@angular/router';
import { RecipeAddComponent } from './components/details-view/recipe-add/recipe-add.component';
import { RecipeFormComponent } from './components/common/recipe-form/recipe-form.component';
import { DefaultViewComponent } from './components/details-view/default-view/default-view.component';
import {MatTableModule} from '@angular/material/table';
import { NewIngredientDialogComponent } from './components/common/recipe-form/new-ingredient-dialog/new-ingredient-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthorInfoComponent } from './components/author-info/author-info.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRippleModule} from '@angular/material/core';
import { DeleteConfirmComponent } from './components/common/delete-confirm/delete-confirm.component';
import {TimeTransformPipe} from './components/details-view/recipe-details/time-transform.pipe';
import {IngredientFormatterPipe} from './components/details-view/recipe-details/ingredient-formatter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeEditComponent,
    RecipeAddComponent,
    RecipeFormComponent,
    DefaultViewComponent,
    NewIngredientDialogComponent,
    AuthorInfoComponent,
    DeleteConfirmComponent,
    TimeTransformPipe,
    IngredientFormatterPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    ScrollingModule,
    RouterModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatRippleModule
  ],
  providers: [{provide: 'url', useValue: '/api/recipe'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
