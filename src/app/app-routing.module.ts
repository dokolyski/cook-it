import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecipeEditComponent} from 'src/app/components/details-view/recipe-edit/recipe-edit.component';
import {RecipeAddComponent} from 'src/app/components/details-view/recipe-add/recipe-add.component';
import {DefaultViewComponent} from 'src/app/components/details-view/default-view/default-view.component';
import {RecipeDetailsComponent} from 'src/app/components/details-view/recipe-details/recipe-details.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultViewComponent
  },
  {
    path: 'details/:id',
    component: RecipeDetailsComponent
  },
  {
    path: 'edit-recipe/:id',
    component: RecipeEditComponent
  },
  {
    path: 'add-recipe',
    component: RecipeAddComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
