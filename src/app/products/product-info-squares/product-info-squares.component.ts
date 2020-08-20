import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-info-squares',
  templateUrl: './product-info-squares.component.html',
  styleUrls: ['./product-info-squares.component.scss'],
})
export class ProductInfoSquaresComponent implements OnInit {
  @Input() product: Product;
  constructor() {}

  ngOnInit(): void {}
}
