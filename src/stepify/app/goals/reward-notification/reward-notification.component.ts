import {Component, Input, OnInit} from '@angular/core';
import {Level} from '../models/Level';
import {MessageService} from '../../../messages/message.service';

declare var $: any;

@Component({
  selector: 'stepify-reward-notification',
  templateUrl: './reward-notification.component.html',
  styleUrls: ['./reward-notification.component.scss']
})
export class RewardNotificationComponent implements OnInit {

  @Input()
  public level: Level;

  constructor(private messageServcie: MessageService) {
  }

  ngOnInit() {
  }
}
