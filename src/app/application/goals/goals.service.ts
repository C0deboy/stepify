import {Injectable} from '@angular/core';
import {Goal} from './models/Goal';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class GoalsService {

  constructor(private httpClient: HttpClient) {
  }

  private baseURL = 'http://localhost:8080';

  getGoals(): Observable<Goal[]> {
    return this.httpClient.get(this.baseURL + '/goals').pipe(map((objects: Goal[]) => {
      return objects.map(object => Goal.deserialize(object));
    }));
  }

  getGoal(id: number): Observable<Goal> {
    return this.httpClient.get(this.baseURL + '/goals/' + id).pipe(map(object => {
      return Goal.deserialize(object);
    }));
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
