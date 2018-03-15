import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyHabitCalendarComponent } from './daily-habit-calendar.component';

describe('DailyHabitCalendarComponent', () => {
  let component: DailyHabitCalendarComponent;
  let fixture: ComponentFixture<DailyHabitCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyHabitCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyHabitCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
