import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GenericClass } from 'src/app/class/generic-class';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  public item: GenericClass;
  constructor(
    public dialogRef: MatDialogRef<ItemDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}



  ngOnInit() {
    this.item = this.data.item;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
