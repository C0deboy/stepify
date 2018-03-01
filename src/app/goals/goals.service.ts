import { Injectable } from '@angular/core';
import {Goal} from './Goal';
import { of } from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {Level} from './Level';

export const GOALS: Goal[] = [
  { id: 1, name: 'Mr. Nice', levels: [new Level('First'), new Level('Second'), new Level('Third')]},
  { id: 2, name: 'Narco', levels: [new Level('First'), new Level('Second'), new Level('Third')]},
  { id: 3, name: 'Bombasto', levels: [new Level('First'), new Level('Second'), new Level('Third')]},
  { id: 4, name: 'Win', levels: [new Level('First'), new Level('Second'), new Level('Third')]},
  { id: 5, name: 'Test', levels: [new Level('First'), new Level('Second'), new Level('Third')]},
];

@Injectable()
export class GoalsService {

  constructor() { }

  getGoals(): Observable<Goal[]> {
    return of(GOALS);
  }

  getGoal(id: number) {
    return of(GOALS.filter(g => g.id = id));
  }
}
