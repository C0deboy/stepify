import {Pipe, PipeTransform} from '@angular/core';
import {Goal} from '../models/Goal';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(goals: Goal[], searchText: string): any[] {
    if (!goals) {
      return [];
    }
    if (!searchText) {
      return goals;
    }
    searchText = searchText.toLowerCase();
    return goals.filter(goal => {
      return goal.name.toLowerCase().includes(searchText);
    });
  }
}
