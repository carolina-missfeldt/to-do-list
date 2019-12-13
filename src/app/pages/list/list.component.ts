import { Component, OnInit } from '@angular/core';
import { GenericClass } from 'src/app/class/generic-class';
import { HttpService } from 'src/app/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public lists: Array<GenericClass>;
  public listName: string = "";
  public edit: boolean = false;
  public listId: string = '';
  public categoryId: string = '';
  constructor(public httpService: HttpService, public router: Router, public route: ActivatedRoute) { }


  ngOnInit() {
     this.route.parent.params.subscribe(params => {
      this.categoryId = params['id'];
      console.log(this.categoryId);
   });
   if(this.categoryId) {
     this.getList();

   }
  }



  getList() {
    this.httpService.getList(`categories/${this.categoryId}/lists`).subscribe( payload => {
      console.log(payload);
      this.lists = payload.map( item => new GenericClass(item));;
      console.log(this.lists);
    })
  }

  newList() {
    console.log('deu enter', this.listName);
    let params: GenericClass;
    if (this.listName !== "") {
      params = {
        name: this.listName
      }
      this.httpService.post(`categories/${this.categoryId}/lists`, params).subscribe(payload => {
        console.log(payload);
        this.getList();
        this.listName = '';
      })
    };
  }

  deleteList(listId) {
    console.log(`categories/${this.categoryId}/lists/${listId}`);
    this.httpService.delete(`categories/${this.categoryId}/lists/${listId}`).subscribe(payload => {
      console.log(payload);
      this.getList();
    });
  }

  openEdition(id: string) {
    this.listId = id;
    this.edit = !this.edit;
  }

  editList(id: string, name: string) {
    console.log('deu enter', id, name);
    let params: GenericClass;
    if (name !== "" && id !== "") {
      params = {
        name: name,
        id: id
      }
      console.log(params);
      this.httpService.put(`categories/${this.categoryId}/lists/${params.id}`, params).subscribe(payload => {
        console.log(payload);
        this.getList();
        this.edit = false;
      })
    };
  }

  // openList(id: string) {
  //   this.router.navigate([`/categories/${id}/lists`]);
  // }

}
