import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Product } from '../product';

@Component({
  selector: 'app-product-collections-dialog',
  templateUrl: './product-collections-dialog.component.html',
  styleUrls: ['./product-collections-dialog.component.scss'],
})
export class ProductCollectionsDialogComponent implements OnInit {
  updated = false;
  constructor(
    public dialogRef: MatDialogRef<ProductCollectionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data.product.name);
  }
  removeCollectionItem() {
    this.updated = true;
  }
  onNoClick(): void {
    this.dialogRef.close(this.updated);
  }
}
