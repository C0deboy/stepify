import {Injectable} from '@angular/core';
import {Message} from './Message';
import {MessageType} from './MessageType';

@Injectable()
export class MessageService {

  public messages: Message[] = [];

  private disappearsAfter = 2500;
  private messageWaiting = 0;

  constructor() {
  }

  getMessages(): Message[] {
    return this.messages;
  }

  showMessage(message: Message) {
    this.pushMessage(message);
  }

  showSuccessMessage(text: string) {
    const message = new Message(text, MessageType.SUCCESS);
    this.pushMessage(message);
  }

  showErrorMessage(text: string) {
    const message = new Message(text, MessageType.ERROR);
    this.pushMessage(message);
  }

  showWarningMessage(text: string) {
    const message = new Message(text, MessageType.WARNING);
    this.pushMessage(message);
  }

  showInfoMessage(text: string) {
    const message = new Message(text, MessageType.INFO);
    this.pushMessage(message);
  }

  pushMessage(message: Message) {
    if (this.messages.length >= 5) {
      this.messages.shift();
    }
    this.messages.push(message);
    this.hideMessageOneByOne();
  }

  private hideMessageOneByOne() {
    this.messageWaiting++;
    setTimeout(() => {
      this.messages.shift();
      this.messageWaiting--;
    }, this.disappearsAfter * this.messageWaiting);
  }
}
