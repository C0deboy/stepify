export class ListItem {
  value: string;
  checked: boolean;

  constructor(value: string, checked: boolean) {
    this.value = value;
    this.checked = checked;
  }

  static empty() {
    return new ListItem('', false);
  }
}
