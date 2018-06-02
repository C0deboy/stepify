import {MessageType} from './MessageType';

export class Message {
  public type: MessageType;
  public text: string;


  constructor(text: string, type: MessageType) {
    this.type = type;
    this.text = text;
  }
}
