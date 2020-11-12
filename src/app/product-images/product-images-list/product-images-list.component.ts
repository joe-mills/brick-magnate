import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductImage } from '../product-image';

@Component({
  selector: 'app-product-images-list',
  templateUrl: './product-images-list.component.html',
  styleUrls: ['./product-images-list.component.scss'],
})
export class ProductImagesListComponent implements OnInit {
  @Input() productImages: ProductImage[];
  @Output() imageUpdated = new EventEmitter<ProductImage>();
  constructor() {}

  ngOnInit(): void {}

  updateImage(productImage) {
    this.imageUpdated.next(productImage);
  }
}
