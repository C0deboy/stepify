import {Injectable} from '@angular/core';
import {Goal} from './models/Goal';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Properties} from '../../properties';

@Injectable()
export class GoalsService {

  constructor(private httpClient: HttpClient) {
  }

  getGoals(): Observable<Goal[]> {
    return this.httpClient.get(Properties.REST_BASE_URL + '/goals').pipe(map((objects: Goal[]) => {
      return objects.map(object => Goal.deserialize(object));
    }));
  }

  getGoal(id: number): Observable<Goal> {
    return this.httpClient.get(Properties.REST_BASE_URL + '/goals/' + id).pipe(map(object => {
      return Goal.deserialize(object);
    }));
  }

  updateGoal(goal: Goal): Observable<Goal> {
    return this.httpClient.put<Goal>(Properties.REST_BASE_URL + '/goals', goal).pipe(map(object => {
      return Goal.deserialize(object);
    }));
  }

  addGoal(goal: Goal) {
    return this.httpClient.post(Properties.REST_BASE_URL + '/goals', goal);
  }

  deleteGoal(id: String) {
    return this.httpClient.delete(Properties.REST_BASE_URL + '/goals/' + id);
  }
}
