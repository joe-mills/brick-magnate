import { Component, OnInit } from '@angular/core';
import { AppConfigService } from './shared/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lego-market-client';
  constructor(private appConfigService: AppConfigService) {}
  ngOnInit(): void {
    this.appConfigService.getTestConfig().subscribe();
  }
}
