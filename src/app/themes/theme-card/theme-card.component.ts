import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Theme } from '../theme';

@Component({
  selector: 'app-theme-card',
  templateUrl: './theme-card.component.html',
  styleUrls: ['./theme-card.component.scss'],
})
export class ThemeCardComponent implements OnInit {
  @Input() theme: Theme;
  @Output() themeSelected = new EventEmitter<Theme>();

  runStatus: string;

  constructor() {}

  ngOnInit(): void {}
  select(theme: Theme) {
    this.themeSelected.next(theme);
  }
}
