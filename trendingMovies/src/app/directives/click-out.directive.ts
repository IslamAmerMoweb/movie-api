import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appClickOut]',
})
export class ClickOutDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @Output() public Clicked = new EventEmitter();
  @HostListener('document:click', ['$event.target'])
  onClick(target: MouseEvent) {
    const solve = this.el.nativeElement.contains(target);
    if (!solve) {
      this.Clicked.emit(target);
    }
  }
}
