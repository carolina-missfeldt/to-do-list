import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
  // { path: 'category/id:/lists', component: ListComponent},
  {
    path: 'categories/:id',
    children: [
      { path: '', component: ListComponent },
      { path: 'lists', component: ListComponent },
    ]

  },
  { path: '**', component: CategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { useHash: true },
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
