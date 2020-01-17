import { Component, OnInit } from '@angular/core';
import { GenericClass } from 'src/app/class/generic-class';
import { HttpService } from 'src/app/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ItemDetailComponent } from '../item-detail/item-detail.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  public pageTitle = "Minhas tarefas";
  public items: Array<GenericClass>;
  public itemName: string = "";
  public edit: boolean = false;
  public itemId: string = '';
  public listId: string = '';
  public categoryId: string = '';
  public backRoute = '';

  constructor(public httpService: HttpService, public router: Router, public route: ActivatedRoute, public dialog: MatDialog) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params['cId'];
      this.listId = params['lId'];
      this.backRoute = `/categories/${this.categoryId}/lists/`;
      this.getItems();
    });
  }



  getItems() {
    this.httpService.getList(`categories/${this.categoryId}/lists/${this.listId}/items`).subscribe(payload => {
      this.items = payload.map(item => new GenericClass(item));;

    })
  }

  getItem(itemId) {
    this.httpService.getList(`categories/${this.categoryId}/lists/${this.listId}/items/${itemId}`).subscribe(payload => {

      const item = payload.map(item => new GenericClass(item));;
      this.openDialog(item);

    });

  }
  openDialog(item): void {
    const dialogRef = this.dialog.open(ItemDetailComponent, {
      width: '250px',
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.editItem(result.id, result.name, result.done);
    });
  }


  newItem() {

    let params: GenericClass;
    if (this.itemName !== "") {
      params = {
        "name": this.itemName,
        "done": false
      }
      this.httpService.post(`categories/${this.categoryId}/lists/${this.listId}/items`, params).subscribe(payload => {

        this.getItems();
        this.itemName = '';
        this.httpService.openSnackBar('Item adicionado com sucesso', 'ok');
      })
    };
  }

  deleteItem(itemtId) {
    this.httpService.delete(`categories/${this.categoryId}/lists/${this.listId}/items/${itemtId}`).subscribe(payload => {
      this.getItems();
      this.httpService.openSnackBar('Item removido com sucesso', 'ok');
    });
  }

  openEdition(id: string) {
    this.itemId = id;
    this.edit = !this.edit;
  }

  editItem(id: string, name: string, done?: boolean) {
    done = !done;
    let params: GenericClass;
    if (name !== "" && id !== "") {
      params = {
        name: name,
        id: id,
        done: done
      }

      this.httpService.put(`categories/${this.categoryId}/lists/${this.listId}/items/${id}`, params).subscribe(payload => {
        this.getItems();
        this.edit = false;
        this.httpService.openSnackBar('Item editado com sucesso', 'ok');
      })
    };
  }

}
