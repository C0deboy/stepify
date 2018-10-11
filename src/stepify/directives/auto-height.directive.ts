import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[stepifyAutoHeight]'
})
export class AutoHeightDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.rows = 1;
  }

  @HostListener('keyup') onClick() {
    this.autoHeight(this.el.nativeElement);
  }

  autoHeight(element) {
    element.style.height = '0';
    element.style.height = (element.scrollHeight) + 'px';
  }

}
