import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './pages/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ListComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule
  ],
  exports: [
    AngularMaterialModule
  ],
  providers: [HttpClient,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
