import { Component, OnInit } from '@angular/core';
import { GenericClass } from 'src/app/class/generic-class';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categories: Array<GenericClass>;
  constructor(public httpService: HttpService) {}

  ngOnInit() {
    this.getCategory();
  }

  deleteCategory(category_id) {
    console.log('cliquei no', category_id);
    this.httpService.delete(`categories/${category_id}`).subscribe(payload => {
      console.log(payload);
      this.getCategory();
    });
  }

  getCategory() {
    this.httpService.getList('categories').subscribe( payload => {
      console.log(payload);
      this.categories = payload.map( item => new GenericClass(item));;
      console.log(this.categories);
    })
  }

}
