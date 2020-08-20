import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from '../product';
import { Collection } from 'src/app/collections/collection';

@Component({
  selector: 'app-product-card-medium',
  templateUrl: './product-card-medium.component.html',
  styleUrls: ['./product-card-medium.component.scss'],
})
export class ProductCardMediumComponent implements OnInit {
  @Input() product: Product;
  @Input() collections: Collection[];
  @Input() expanded: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
