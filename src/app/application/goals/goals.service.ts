import {Injectable} from '@angular/core';
import {Goal} from './models/Goal';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {Level} from './models/Level';
import {CheckList} from './models/Checklist';
import {ListItem} from './models/ListItem';

const mockLevels = [
  new Level(1, 'Ważę 90 kg', 'Wino', true),
  new Level(2, 'Ważę 87 kg', 'Kolacja'),
  new Level(3, 'Ważę 87 kg przez rok', 'Obraz')
];

const mockLevels2 = [
  new Level(1, 'Przebiegłem 100Km del Passatore', 'Wino 2'),
  new Level(2, 'Przebiegłem 100 Miles Around the isle of Mors', 'Kolacja 2'),
  new Level(3, 'Przebiegłem Badwater Ultramarathon', 'Obraz 2')
];

const mockLevels3 = [
  new Level(1, 'Video blog ciągle przez 30 dni', 'Wino 3', ),
  new Level(2, 'Video blog ciągle przez 120 dni', 'Kolacja 3'),
  new Level(3, 'Video blog ciągle przez 365 dni', 'Obraz 3'),
  new Level(4, 'Video blog ciągle przez 1000 dni', 'Obraz 3'),
];

const mockChecklist = new CheckList('Progress', [
    {value: '92 kg', checked: true},
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
let id = 1;
export const GOALS: Goal[] = [
  {id: id++, name: 'Waga', levels: mockLevels, checklist: mockChecklist},
  {id: id++, name: 'Biegi', levels: mockLevels2, checklist: null},
  {id: id++, name: 'Codzienny YouTuber', levels: mockLevels3, checklist: mockChecklist3},
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

  addGoal(goal: Goal) {
    goal.id = id++;
    GOALS.push(goal);
  }
}
