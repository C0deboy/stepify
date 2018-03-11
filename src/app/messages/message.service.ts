import { Injectable } from '@angular/core';
import {Message} from './Message';
import {MessageType} from './MessageType';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MessageService {

  public messages: Array<Message> = [];

  constructor() { }

  getMessages(): Observable<Array<Message>> {
    return of(this.messages);
  }

  showMessage(message: Message) {
    this.pushMessage(message);
  }

  showSuccessMessage(text: string){
    const message = new Message(text, MessageType.SUCCESS);
    this.pushMessage(message);
  }
  showErrorMessage(text: string){
    const message = new Message(text, MessageType.ERROR);
    this.pushMessage(message);
  }
  showWarningMessage(text: string){
    const message = new Message(text, MessageType.WARNING);
    this.pushMessage(message);
  }
  showInfoMessage(text: string){
    const message = new Message(text, MessageType.INFO);
    this.pushMessage(message);
  }
  pushMessage(message: Message) {
    if(this.messages.length >= 5) {
      this.messages.shift();
    }
    this.messages.push(message);
  }
}
