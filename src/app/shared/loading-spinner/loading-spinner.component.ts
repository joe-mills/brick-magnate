import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  @Input()
  loading = false;
  @Input()
  error = '';
  spinnerColour = 'accent';

  constructor() {}

  ngOnInit() {}
}
