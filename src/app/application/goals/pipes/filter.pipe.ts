import {Pipe, PipeTransform} from '@angular/core';
import {Goal} from '../models/Goal';
import {el} from '@angular/platform-browser/testing/src/browser_util';

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
      if (searchText.match(/[\d.\-]+/)) {
        return goal.levels.some((level) => level.toBeDoneAt ? level.toBeDoneAt.includes(searchText) : false);
      } else {
        return goal.name.toLowerCase().includes(searchText);
      }
    });
  }
}
