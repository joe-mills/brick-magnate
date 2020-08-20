import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss'],
})
export class ImageLoaderComponent {
  @Input() loader: string =
    'https://media.giphy.com/media/y1ZBcOGOOtlpC/200.gif';
  @Input() height: number = 200;
  @Input() width: number = 200;
  @Input() image: string;

  isLoading: boolean;

  constructor() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }
}
