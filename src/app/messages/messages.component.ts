import {Component, ElementRef, OnInit} from '@angular/core';
import {MessageService} from './message.service';
import {Message} from './Message';
import {MessageType} from './MessageType';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('* => *', [
        query(':enter', [
          style({transform: 'translateX(200%)', opacity: 1}),
          stagger('300ms', [
            animate('0.3s 0.1s ease', style({
              transform: 'translateX(0)',
              opacity: 1,
            })),
          ])], {optional: true}
        ),
        query(':leave',
          stagger('50ms', [
            animate('0.3s 0.1s ease', style({
              transform: 'translateX(200%)',
              opacity: 0,
            }))
          ]), {optional: true}
        )
      ])
    ])
  ]
})
export class MessagesComponent implements OnInit {

  public messages: Message[];
  public MessageType = MessageType;

  constructor(private messageService: MessageService, private el: ElementRef) {
  }

  ngOnInit() {
    this.messages = this.messageService.getMessages();
  }
}
