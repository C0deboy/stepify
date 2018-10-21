import {Directive, ElementRef} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[stepifyTooltip]'
})
export class TooltipDirective {

  constructor(element: ElementRef) {
    const el = $(element.nativeElement);

    $(function () {
      el.tooltip();
    });
  }

}
