import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyHabitCalendarComponent } from './daily-habit-calendar.component';
import moment = require('moment');
import {MessageService} from '../../../messages/message.service';
import {DailyHabit} from '../../goals/models/daily-habit';

fdescribe('DailyHabitCalendarComponent', () => {
  let component: DailyHabitCalendarComponent;
  let fixture: ComponentFixture<DailyHabitCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyHabitCalendarComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyHabitCalendarComponent);
    component = fixture.componentInstance;
    component.dailyHabit = DailyHabit.empty();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  [
    {from: '2018-03-01', to: '2018-05-31', everyNDays: 1, months: 3, daysPerMonth: [31, 30, 31]},
    {from: '2018-03-01', to: '2018-05-31', everyNDays: 2, months: 3, daysPerMonth: [16, 15, 15]},
    {from: '2018-03-01', to: '2018-05-30', everyNDays: 1, months: 3, daysPerMonth: [31, 30, 30]},
    {from: '2018-03-15', to: '2018-05-15', everyNDays: 1, months: 3, daysPerMonth: [17, 30, 15]},
    {from: '2018-03-01', to: '2018-05-30', everyNDays: 2, months: 3, daysPerMonth: [16, 15, 15]},
    {from: '2018-03-01', to: '2018-05-30', everyNDays: 3, months: 3, daysPerMonth: [11, 10, 10]},
    {from: '2018-03-01', to: '2018-05-31', everyNDays: 5, months: 3, daysPerMonth: [7, 6, 6]},
  ].forEach((data) => {
    it(`should build correct calendar with from=${data.from}, to=${data.to} and everyNDays=${data.everyNDays}`, () => {
      component.dailyHabit.from = moment(data.from);
      component.dailyHabit.to = moment(data.to);
      component.dailyHabit.everyNDays = data.everyNDays;
      component.buildCalendar();

      expect(component.calendar.length).toBe(data.months);
      let totalDays = 0;

      for(let i = 0; i < component.calendar.length; i++){
        expect(component.calendar[i].length).toBe(data.daysPerMonth[i]);
        totalDays += data.daysPerMonth[i];
      }

      expect(component.dailyHabit.getDaysDifference()).toBe(totalDays);
    });
  });

});
