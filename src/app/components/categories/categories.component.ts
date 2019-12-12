import { Component, OnInit } from '@angular/core';
import { GenericClass } from 'src/app/class/generic-class';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public teste: Array<GenericClass>;
  constructor(public httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getList('categories').subscribe( payload => {
      console.log(payload);
      const teste = payload.map( item => new GenericClass(item));
      this.teste = teste;
      console.log(teste);
    })
  }

}
