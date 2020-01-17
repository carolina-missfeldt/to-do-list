import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ListComponent } from './pages/list/list.component';
import { ItemsComponent } from './pages/items/items.component';


const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'categories/:id/lists', component: ListComponent },
  { path: 'categories/:cId/list/:lId/items', component: ItemsComponent },
  { path: '**', component: CategoriesComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(
  routes,
    { useHash: true },
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
