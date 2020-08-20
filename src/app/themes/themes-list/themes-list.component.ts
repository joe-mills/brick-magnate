import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Theme } from '../theme';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.scss'],
})
export class ThemesListComponent implements OnInit {
  @Input() themes: Theme[];
  @Output() themeSelected = new EventEmitter<Theme>();
  // @Output() spiderRun = new EventEmitter<Theme>();
  // runStatus: string;
  constructor() {}

  ngOnInit(): void {}
  select(theme: Theme) {
    this.themeSelected.next(theme);
  }

  // runSpider(theme: Theme) {
  //   this.spiderRun.next(theme);
  //   this.runStatus = new Date().toLocaleDateString();
  // }
}
