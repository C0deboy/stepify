import {ListItem} from './ListItem';

export class CheckList {
  name: string;
  list: ListItem[];

  constructor(name: string, checklist: ListItem[]) {
    this.name = name;
    this.list = checklist;
  }

  static empty(): CheckList {
    return new CheckList('', []);
  }

  addItem(newListItem: string) {
    this.list.push(new ListItem(newListItem, false));
    console.log(this.list);
  }

  addItems(values: string[]) {
    values.forEach(newListItem => {
      this.list.push(new ListItem(newListItem, false));
    });
  }

  removeItem(i) {
    this.list.splice(i, 1);
  }

  isEmpty(): boolean {
    return this.list.length > 0;
  }
}
