import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appSmallInputNumber]'
})
export class SmallInputNumberDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.el.nativeElement.parentElement.style.width = '30px';
  }




}
