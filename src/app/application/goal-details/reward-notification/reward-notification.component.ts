import {Component, Input, OnInit} from '@angular/core';
import {Level} from '../../goals/models/Level';
declare var $: any;

@Component({
  selector: 'app-reward-notification',
  templateUrl: './reward-notification.component.html',
  styleUrls: ['./reward-notification.component.css']
})
export class RewardNotificationComponent implements OnInit {

  @Input()
  public level: Level;

  constructor() { }

  ngOnInit() {
  }

}
