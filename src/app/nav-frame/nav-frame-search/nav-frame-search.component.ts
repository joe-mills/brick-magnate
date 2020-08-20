import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchItem } from 'src/app/search/search-box/search-box.component';

@Component({
  selector: 'app-nav-frame-search',
  templateUrl: './nav-frame-search.component.html',
  styleUrls: ['./nav-frame-search.component.scss'],
})
export class NavFrameSearchComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  selectSearchItem(searchItem: SearchItem) {
    this.router.navigate(['/products', searchItem.productCode]);
  }
}
