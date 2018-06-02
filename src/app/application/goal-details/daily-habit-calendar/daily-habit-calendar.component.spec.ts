import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DailyHabitCalendarComponent} from './daily-habit-calendar.component';
import {DailyHabit} from '../../goals/models/daily-habit';
import {MatTooltipModule} from '@angular/material';
import moment = require('moment');

fdescribe('DailyHabitCalendarComponent', () => {
  let component: DailyHabitCalendarComponent;
  let fixture: ComponentFixture<DailyHabitCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DailyHabitCalendarComponent],
      imports: [MatTooltipModule],
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

      for (let i = 0; i < component.calendar.length; i++) {
        expect(component.calendar[i].length).toBe(data.daysPerMonth[i]);
        totalDays += data.daysPerMonth[i];
      }

      expect(component.dailyHabit.getDaysDifference()).toBe(totalDays);
    });
  });

  [
    {from: '2018-03-01', to: '2018-05-31', specificDays: [2, 4], months: 3, daysPerMonth: [9, 8, 10]},
    {from: '2018-03-01', to: '2018-03-31', specificDays: [2, 4], months: 1, daysPerMonth: [9]},
    {from: '2018-03-01', to: '2018-03-31', specificDays: [4], months: 1, daysPerMonth: [5]},
    {from: '2018-03-01', to: '2018-03-31', specificDays: [5], months: 1, daysPerMonth: [5]},
    {from: '2018-03-01', to: '2018-03-31', specificDays: [6], months: 1, daysPerMonth: [5]},
    {from: '2018-03-01', to: '2018-03-31', specificDays: [0], months: 1, daysPerMonth: [4]},
    {from: '2018-03-01', to: '2018-03-31', specificDays: [1], months: 1, daysPerMonth: [4]},
    {from: '2018-03-01', to: '2018-03-31', specificDays: [2], months: 1, daysPerMonth: [4]},
    {from: '2018-03-01', to: '2018-03-31', specificDays: [3], months: 1, daysPerMonth: [4]},
    {from: '2018-03-01', to: '2018-03-31', specificDays: [0, 1, 2, 3], months: 1, daysPerMonth: [16]},
    {from: '2018-03-01', to: '2018-03-31', specificDays: [4, 5, 6], months: 1, daysPerMonth: [15]},
    {from: '2018-03-01', to: '2018-03-31', specificDays: [0, 1, 2, 3, 4, 5, 6], months: 1, daysPerMonth: [31]},
    {from: '2018-03-01', to: '2018-03-31', specificDays: [1, 3, 5], months: 1, daysPerMonth: [13]},
    {from: '2018-05-31', to: '2018-06-30', specificDays: [3], months: 1, daysPerMonth: [4]},

  ].forEach((data) => {
    it(`should build correct calendar with from=${data.from}, to=${data.to} and specificDays=${data.specificDays}`, () => {
      component.dailyHabit.from = moment(data.from);
      component.dailyHabit.to = moment(data.to);
      component.dailyHabit.everyNDays = null;
      component.dailyHabit.specificDays = data.specificDays;
      component.buildCalendar();

      expect(component.calendar.length).toBe(data.months);
      let totalDays = 0;

      for (let i = 0; i < component.calendar.length; i++) {
        expect(component.calendar[i].length).toBe(data.daysPerMonth[i]);
        totalDays += data.daysPerMonth[i];
      }

      expect(component.dailyHabit.getDaysDifference()).toBe(totalDays);
    });
  });

});
