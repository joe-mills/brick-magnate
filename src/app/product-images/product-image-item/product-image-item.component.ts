import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { ProductImage } from '../product-image';

@Component({
  selector: 'app-product-image-item',
  templateUrl: './product-image-item.component.html',
  styleUrls: ['./product-image-item.component.scss'],
})
export class ProductImageItemComponent implements OnInit {
  @Input() productImage: ProductImage;
  @Output() imageUpdated = new EventEmitter<ProductImage>();
  selectedImageType: string;
  imageTypes: string[] = ['PRIMARY', 'ALT', 'BOX', 'MINIFIG'];
  constructor() {}

  ngOnInit(): void {
    this.selectedImageType = this.productImage.imageType;
  }

  changeImageType(change: MatRadioChange) {
    this.imageUpdated.next({
      ...this.productImage,
      imageType: this.selectedImageType,
    });
  }
}
