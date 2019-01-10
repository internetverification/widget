import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  OnInit
} from '@angular/core';
import { timer } from 'rxjs';
import { first } from 'rxjs/operators';

@Directive({
  selector: '[ivwResize]'
})
export class ResizeDirective implements OnInit {
  @Output()
  ivwResizeChange = new EventEmitter();

  constructor(private hostElement: ElementRef) {}
  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.sizeChange();
    });
    timer(200)
      .pipe(first())
      .subscribe(() => {
        this.sizeChange();
      });
  }

  private sizeChange() {
    this.ivwResizeChange.next({
      width: this.hostElement.nativeElement.offsetWidth,
      height: this.hostElement.nativeElement.offsetHeight
    });
  }
}
