import { Directive, Input, ElementRef, TemplateRef } from '@angular/core';
// import { TileDto } from '@common/shared';

@Directive({
  selector: '[balloonAnchor]'
})
export class AnchorDirective {

  @Input() balloonAnchor: string;

  constructor(public templateRef: TemplateRef<any>) { }

}
