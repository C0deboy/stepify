import {Injectable} from '@angular/core';
import {Goal} from './Goal';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {Level} from './Level';
import {CheckList} from './CheckList';
import {ListItem} from './ListItem';

const mockLevels = [
  new Level('First', 'Cookie', '🚀'),
  new Level('Second', 'Wine', '🔥'),
  new Level('Third', 'Cheat day', '💎')
];

const mockLevels2 = [
  new Level('First level', 'Apple', '🚀'),
  new Level('Second level', 'Car', '🔥'),
  new Level('Third level', 'Plane', '💎')
];

const mockLevels3 = [
  new Level('1', 'Bread', '🚀'),
  new Level('2', 'Ham', '🔥'),
  new Level('3', 'Pepsi', '💎')
];

const mockChecklist = new CheckList('Checklist', 'Description of checklist', [
    {value: 'item', checked: false},
    {value: 'item 2', checked: true},
    {value: 'item 3', checked: true},
    {value: 'item 4', checked: false},
    {value: 'item 5', checked: false},
    {value: 'item 6', checked: false}
  ]);

const mockChecklist2 = new CheckList('Checklist 2', 'Description of checklist 2', [
  {value: 'item', checked: false},
  {value: 'item 2', checked: true},
  {value: 'item 3', checked: true},
  {value: 'item 4', checked: false},
]);

const mockChecklist3 = new CheckList('Checklist 3', 'Description of checklist 3', [
  {value: 'item', checked: false},
  {value: 'item 2', checked: true},
  {value: 'item 3', checked: true},
]);

export const GOALS: Goal[] = [
  {id: 1, name: 'Goal 1', levels: mockLevels, checklist: mockChecklist},
  {id: 2, name: 'Goal 2', levels: mockLevels2, checklist: mockChecklist2},
  {id: 3, name: 'Goal 3', levels: mockLevels3, checklist: mockChecklist3},
];

@Injectable()
export class GoalsService {

  constructor() {
  }

  getGoals(): Observable<Goal[]> {
    return of(GOALS);
  }

  getGoal(id: number) {
    return of(GOALS.filter(g => g.id === id));
  }

  updateGoal(goal: Goal) {
    return of(GOALS[goal.id] = goal);
  }
}
