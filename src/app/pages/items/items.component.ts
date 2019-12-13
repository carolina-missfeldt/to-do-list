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
      console.log(params);
      this.categoryId = params['cId'];
      this.listId = params['lId'];
      this.backRoute = `/categories/${this.categoryId}/lists/`;
      this.getItems();
    });
  }



  getItems() {
    this.httpService.getList(`categories/${this.categoryId}/lists/${this.listId}/items`).subscribe(payload => {
      console.log(payload);
      this.items = payload.map(item => new GenericClass(item));;
      console.log(this.items);
    })
  }

  getItem(itemId) {
    this.httpService.getList(`categories/${this.categoryId}/lists/${this.listId}/items/${itemId}`).subscribe(payload => {
      console.log(payload);
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
    console.log('deu enter', this.itemName);
    let params: GenericClass;
    if (this.itemName !== "") {
      params = {
        "name": this.itemName,
        "done": false
      }
      this.httpService.post(`categories/${this.categoryId}/lists/${this.listId}/items`, params).subscribe(payload => {
        console.log(payload);
        this.getItems();
        this.itemName = '';
      })
    };
  }

  deleteItem(itemtId) {
    this.httpService.delete(`categories/${this.categoryId}/lists/${this.listId}/items/${itemtId}`).subscribe(payload => {
      console.log(payload);
      this.getItems();
    });
  }

  openEdition(id: string) {
    this.itemId = id;
    this.edit = !this.edit;
  }

  editItem(id: string, name: string, done?: boolean) {
    done = !done;
    console.log(done);
    let params: GenericClass;
    if (name !== "" && id !== "") {
      params = {
        name: name,
        id: id,
        done: done
      }
      console.log(params);
      this.httpService.put(`categories/${this.categoryId}/lists/${this.listId}/items/${id}`, params).subscribe(payload => {
        console.log(payload);
        this.getItems();
        this.edit = false;
      })
    };
  }

  //  openList(id: string) {
  //    this.router.navigate([`/categories/${this.listId}/list/${id}/items`]);
  //  }

}
