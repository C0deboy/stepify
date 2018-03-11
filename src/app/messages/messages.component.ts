import {ChangeDetectionStrategy, Component, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MessageService} from './message.service';
import {Message} from './Message';
import {MessageType} from './MessageType';
import { AsyncPipe } from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {animate, group, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({transform: 'translateX(100%)', opacity: 0}),
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(0)',
            opacity: 1
          })),
          animate('200ms 5s ease', style({
            opacity: 0
          }))
        ])
      ]),
      state('in', style({opacity: 0, display: 'none'})),
      transition('* => void', [
        group([
          animate('0.3s 0.1s ease', style({
            transform: 'translateX(200%)',
            opacity: 0,
          })),
        ])
      ])
    ])
  ]
})
export class MessagesComponent implements OnInit {

  public messages: Observable<Message[]>;
  public MessageType = MessageType;

  constructor(private messageService: MessageService, private el: ElementRef) { }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
  }
}
