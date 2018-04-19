import {Injectable} from '@angular/core';
import {Goal} from './models/Goal';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {Level} from './models/Level';
import {CheckList} from './models/Checklist';
import {ListItem} from './models/ListItem';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GoalsService {

  constructor(private httpClient: HttpClient) {
  }

  private baseURL = 'http://localhost:8080';

  getGoals(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/goals');
  }

  getGoal(id: number) {
    return this.httpClient.get(this.baseURL + '/goals/' + id);
  }

  updateGoal(goal: Goal) {
    return this.httpClient.put(this.baseURL + '/goals', goal);
  }

  addGoal(goal: Goal) {
    return this.httpClient.post(this.baseURL + '/goals', goal);
  }

  deleteGoal(id: String) {
    return this.httpClient.delete(this.baseURL + '/goals/' + id);
  }
}
