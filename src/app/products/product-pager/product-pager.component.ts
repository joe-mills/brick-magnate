import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-pager',
  templateUrl: './product-pager.component.html',
  styleUrls: ['./product-pager.component.scss'],
})
export class ProductPagerComponent implements OnInit {
  @Input() length: number;
  @Input() pageIndex: number;
  @Output() onNextPage = new EventEmitter<boolean>();
  @Output() onPreviousPage = new EventEmitter<boolean>();

  currentPage = 0;
  constructor() {}

  ngOnInit(): void {
    
  }

  changePage(pageEvent: PageEvent) {
    if (pageEvent.pageIndex > this.pageIndex) {
      this.onNextPage.emit(true);
    } else {
      this.onPreviousPage.emit(true);
    }
    this.currentPage = pageEvent.pageIndex;
  }
}
