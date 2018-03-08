import {Injectable} from '@angular/core';
import {Goal} from './models/Goal';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {Level} from './models/Level';
import {CheckList} from './models/CheckList';
import {ListItem} from './models/ListItem';

const mockLevels = [
  new Level('Ważę 90 kg', 'Wino'),
  new Level('Ważę 87 kg', 'Kolacja'),
  new Level('Ważę 87 kg przez rok', 'Obraz')
];

const mockLevels2 = [
  new Level('Przebiegłem 100Km del Passatore', 'Wino 2'),
  new Level('Przebiegłem 100 Miles Around the isle of Mors', 'Kolacja 2'),
  new Level('Przebiegłem Badwater Ultramarathon', 'Obraz 2')
];

const mockLevels3 = [
  new Level('Video blog ciągle przez 30 dni', 'Wino 3', ),
  new Level('Video blog ciągle przez 120 dni', 'Kolacja 3'),
  new Level('Video blog ciągle przez 365 dni', 'Obraz 3'),
  new Level('Video blog ciągle przez 1000 dni', 'Obraz 3'),
];

const mockChecklist = new CheckList('Progress', [
    {value: '92 kg', checked: false},
    {value: '91 kg', checked: true},
    {value: '90 kg', checked: true},
    {value: '89 kg', checked: false},
    {value: '88 kg', checked: false},
    {value: '87 kg', checked: false}
  ]);

const mockChecklist3 = new CheckList('Progress 3', [
  {value: '5 dni', checked: false},
  {value: '10 dni', checked: false},
  {value: '15 dni', checked: false},
  {value: '30 dni', checked: false},
  {value: '60 dni', checked: false},
  {value: '120 dni', checked: false},
  {value: '240 dni', checked: false},
  {value: '480 dni', checked: false},
  {value: '960 dni', checked: false},
  {value: '1000 dni', checked: false},
]);

export const GOALS: Goal[] = [
  {id: 1, name: 'Waga', levels: mockLevels, checklist: mockChecklist},
  {id: 2, name: 'Biegi', levels: mockLevels2, checklist: null},
  {id: 3, name: 'Codzienny YouTuber', levels: mockLevels3, checklist: mockChecklist3},
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
