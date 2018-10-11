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
    return this.httpClient.get(Properties.SERVER_BASE_URL + '/goals').pipe(map((objects: Goal[]) => {
      return objects.map(object => Goal.deserialize(object));
    }));
  }

  getGoal(id: number): Observable<Goal> {
    return this.httpClient.get(Properties.SERVER_BASE_URL + '/goals/' + id).pipe(map(object => {
      return Goal.deserialize(object);
    }));
  }

  updateGoal(goal: Goal) {
    return this.httpClient.put(Properties.SERVER_BASE_URL + '/goals', goal);
  }

  addGoal(goal: Goal) {
    return this.httpClient.post(Properties.SERVER_BASE_URL + '/goals', goal);
  }

  deleteGoal(id: String) {
    return this.httpClient.delete(Properties.SERVER_BASE_URL + '/goals/' + id);
  }
}
