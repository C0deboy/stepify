import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardNotificationComponent } from './reward-notification.component';

describe('RewardNotificationComponent', () => {
  let component: RewardNotificationComponent;
  let fixture: ComponentFixture<RewardNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
