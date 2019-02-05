import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[stepifyActivatableInput]'
})
export class ActivatableInputDirective {

  constructor(private el: ElementRef) {
    this.disable(el.nativeElement);
  }

  @HostListener('click') onClick() {
    this.enable(this.el.nativeElement);
  }

  @HostListener('blur') onBlur() {
    this.disable(this.el.nativeElement);
  }

  private disable(element) {
    element.spellcheck = false;
    element.readonly = true;
  }

  private enable(element) {
    element.readonly = false;
    element.spellcheck = true;
  }

}
