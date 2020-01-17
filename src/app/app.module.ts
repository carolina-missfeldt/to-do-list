import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { HttpClient, HttpHandler, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './pages/list/list.component';
import { HeaderComponent } from './components/header/header.component';
import { ItemsComponent } from './pages/items/items.component';
import { ItemDetailComponent } from './pages/item-detail/item-detail.component';
import { HttpErrorInterceptor } from './shared/http-error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ListComponent,
    HeaderComponent,
    ItemsComponent,
    ItemDetailComponent
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
  entryComponents: [ItemDetailComponent],
  providers: [
    HttpClient,HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
