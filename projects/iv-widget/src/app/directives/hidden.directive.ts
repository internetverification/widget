import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[ivwHidden]'
})
export class HiddenDirective implements OnInit {
  private _hidden$ = new BehaviorSubject(false);

  @Input()
  get ivwHidden() {
    return this._hidden$.value;
  }

  set ivwHidden(value: boolean) {
    this._hidden$.next(value);
  }

  constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

  ngOnInit(): void {
    this._hidden$.subscribe(value => {
      if (value) {
        this.renderer.setStyle(
          this.hostElement.nativeElement,
          'visibility',
          'hidden'
        );
        this.renderer.setStyle(this.hostElement.nativeElement, 'height', '0px');
        this.renderer.setStyle(
          this.hostElement.nativeElement,
          'position',
          'absolute'
        );
      } else {
        this.renderer.removeStyle(this.hostElement.nativeElement, 'visibility');
        this.renderer.removeStyle(this.hostElement.nativeElement, 'height');
        this.renderer.removeStyle(this.hostElement.nativeElement, 'position');
      }
    });
  }
}
