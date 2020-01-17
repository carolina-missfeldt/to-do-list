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

  public pageTitle = "Lista de tarefas";
  public lists: Array<GenericClass>;
  public listName: string = "";
  public edit: boolean = false;
  public listId: string = '';
  public categoryId: string = '';
  public backRoute = '';

  constructor(public httpService: HttpService, public router: Router, public route: ActivatedRoute) { }


  ngOnInit() {
     this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      this.backRoute = `/categories/${this.categoryId}/`;
   });
   if(this.categoryId) {
     this.getList();

   }
  }



  getList() {
    this.httpService.getList(`categories/${this.categoryId}/lists`).subscribe( payload => {

      this.lists = payload.map( item => new GenericClass(item));;

    })
  }

  newList() {
    let params: GenericClass;
    if (this.listName !== "") {
      params = {
        name: this.listName
      }
      this.httpService.post(`categories/${this.categoryId}/lists`, params).subscribe(payload => {
        this.getList();
        this.listName = '';
        this.httpService.openSnackBar('Lista adicionada com sucesso', 'ok');
      });
    };
  }

  deleteList(listId) {

    this.httpService.delete(`categories/${this.categoryId}/lists/${listId}`).subscribe(payload => {

      this.getList();

      this.httpService.openSnackBar('Lista removida com sucesso', 'ok');
    });
  }

  openEdition(id: string) {
    this.listId = id;
    this.edit = !this.edit;
  }

  editList(id: string, name: string) {

    let params: GenericClass;
    if (name !== "" && id !== "") {
      params = {
        name: name,
        id: id
      }

      this.httpService.put(`categories/${this.categoryId}/lists/${params.id}`, params).subscribe(payload => {

        this.getList();
        this.edit = false;

        this.httpService.openSnackBar('Lista editada com sucesso', 'ok');
      });
    };
  }

  openListItems(id: string) {
    this.router.navigate([`/categories/${this.categoryId}/list/${id}/items`]);
  }

}
