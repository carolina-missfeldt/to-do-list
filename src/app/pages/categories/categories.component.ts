import { Component, OnInit } from '@angular/core';
import { GenericClass } from 'src/app/class/generic-class';
import { HttpService } from 'src/app/services/http.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public pageTitle = "Categorias";
  public categoryId: string = '';
  public categories: Array<GenericClass>;
  public categoryName: string = "";
  public edit: boolean = false;


  constructor(public httpService: HttpService, public router: Router) {}

  ngOnInit() {
    this.getList();
  }

  
  getList() {
    this.httpService.getList('categories').subscribe( payload => {
      console.log(payload);
      this.categories = payload.map( item => new GenericClass(item));;
      console.log(this.categories);
    })
  }
  
  deleteCategory(category_id) {
    console.log('cliquei no', category_id);
    this.httpService.delete(`categories/${category_id}`).subscribe(payload => {
      console.log(payload);
      this.getList();
    });
  }
  newCategory() {
    console.log('deu enter', this.categoryName);
    let params: GenericClass;
    if (this.categoryName !== "") {
      params = {
        name: this.categoryName
      }
      this.httpService.post('categories', params).subscribe(payload => {
        console.log(payload);
        this.getList();
        this.categoryName = '';
      })
    };
  }

  openEdition(id: string) {
    this.categoryId = id;
    this.edit = !this.edit;
  }

  editCategory(id: string, name: string) {
    console.log('deu enter', id, name);
    let params: GenericClass;
    if (name !== "" && id !== "") {
      params = {
        name: name,
        id: id
      }
      console.log(params);
      this.httpService.put(`categories/${params.id}`, params).subscribe(payload => {
        console.log(payload);
        this.getList();
        this.edit = false;
      })
    };
  }

  openList(id: string) {
    this.router.navigate([`/categories/${id}/lists`]);
  }

}
