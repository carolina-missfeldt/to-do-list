import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  { path: 'categories', component: CategoriesComponent },
  { path: '', redirectTo: 'categories', pathMatch: 'full' },
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
