import { Pipe, PipeTransform } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  constructor(private appConfigService: AppConfigService) {}
  transform(value: string, size?: string): unknown {
    let width = 200;
    switch (size) {
      case 'tiny':
        width = 40;
        break;
      case 'small':
        width = 150;
        break;
      case 'medium':
        width = 200;
        break;
      case 'theme':
        width = 300;
        break;
      case 'large':
        width = 800;
        break;
      default:
        break;
    }
    if (this.appConfigService.usePlaceholders) {
      return '/assets/stub.png';
    }
    return `${value}?width=${width}`;
    // return `api/${value}?width=${width}`;
  }
}
