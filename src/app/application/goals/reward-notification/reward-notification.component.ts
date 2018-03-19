import {Component, Input, OnInit} from '@angular/core';
import {Level} from '../models/Level';
import {MessageService} from '../../../messages/message.service';
declare var $: any;

@Component({
  selector: 'app-reward-notification',
  templateUrl: './reward-notification.component.html',
  styleUrls: ['./reward-notification.component.css']
})
export class RewardNotificationComponent implements OnInit {

  @Input()
  public level: Level;

  constructor(private messageServcie: MessageService) { }

  ngOnInit() {
  }

  recieveReward(reward: string) {
    this.messageServcie.showSuccessMessage(reward + ' has been added to reward list');
    $('#rewardModal').modal('toggle');
  }
}
