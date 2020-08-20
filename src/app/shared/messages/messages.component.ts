import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  errors$: Observable<string[]>;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.errors$ = this.messageService.errors$;
  }

  close() {
    this.messageService.error();
  }
}
