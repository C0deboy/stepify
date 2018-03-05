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

const mockChecklist = new CheckList('Checklist', [
    {value: 'item', checked: false},
    {value: 'item 2', checked: true},
    {value: 'item 3', checked: true},
    {value: 'item 4', checked: false},
    {value: 'item 5', checked: false},
    {value: 'item 6', checked: false}
  ]);

export const GOALS: Goal[] = [
  {id: 1, name: 'Mr. Nice', levels: mockLevels, checklist: mockChecklist},
  {id: 2, name: 'Narco', levels: mockLevels, checklist: mockChecklist},
  {id: 3, name: 'Bombasto', levels: mockLevels, checklist: mockChecklist},
  {id: 4, name: 'Win', levels: mockLevels, checklist: mockChecklist},
  {id: 5, name: 'Test', levels: mockLevels, checklist: mockChecklist},
];

@Injectable()
export class GoalsService {

  constructor() {
  }

  getGoals(): Observable<Goal[]> {
    return of(GOALS);
  }

  getGoal(id: number) {
    return of(GOALS.filter(g => g.id = id));
  }
}
