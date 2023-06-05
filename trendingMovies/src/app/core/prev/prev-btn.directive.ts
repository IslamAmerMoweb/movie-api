import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appPrevBtn]',
})
export class PrevBtnDirective {
  @Input() element!: boolean;
  @HostBinding('class.active')
  @HostListener('mouseenter')
  public onMouseEnter() {}

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  changeColor() {
    this.renderer.setStyle(this.el.nativeElement, 'background', 'red');
  }
}
