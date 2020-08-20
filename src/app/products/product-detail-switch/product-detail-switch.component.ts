import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-detail-switch',
  templateUrl: './product-detail-switch.component.html',
  styleUrls: ['./product-detail-switch.component.scss'],
})
export class ProductDetailSwitchComponent implements OnInit {
  @Output() detailSwitched = new EventEmitter<number>();
  detailLevel = 1;
  constructor() {}

  ngOnInit(): void {}
  switchDetail() {
    this.detailLevel = this.detailLevel === 1 ? 2 : 1;
    this.detailSwitched.next(this.detailLevel);
  }
}
