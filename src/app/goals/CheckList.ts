import {ListItem} from './ListItem';

export class CheckList {
  name: string;
  list: ListItem[];
  details: string;

  constructor(name: string, details: string, checklist: ListItem[]) {
    this.name = name;
    this.list = checklist;
    this.details = details;
  }
}
