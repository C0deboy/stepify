export class MdRegex {
  private readonly nameRegex: string;
  private readonly prefix: string;
  private readonly suffix: string;

  constructor(prefix: string, suffix: string = '', nameRegex = '.*?') {
    this.prefix = this.escape(prefix);
    console.log(this.prefix);
    this.nameRegex = nameRegex;
    this.suffix = this.escape(suffix);
  }

  getForMdLink() {
    return new RegExp('\\[?' + this.prefix + '[\\s:]*\\[?(' + this.nameRegex + ')' + this.suffix + '\\]\\((.*?)\\)');
  }

  get() {
    return new RegExp(this.prefix + '[\\s:]*(' + this.nameRegex + ')' + this.suffix);
  }

  private escape(string: string): string {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
}
