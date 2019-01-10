import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ivw-widget-steps-bar',
  templateUrl: './widget-steps-bar.component.html',
  styleUrls: ['./widget-steps-bar.component.scss']
})
export class WidgetStepsBarComponent implements OnInit {
  private _currentIndex = new BehaviorSubject(0);
  private _steps$ = new BehaviorSubject<{ enabled: boolean; state: string }[]>(
    []
  );

  @Output()
  stepClicked = new EventEmitter();

  @Input()
  get currentIndex() {
    return this._currentIndex.value;
  }
  set currentIndex(value) {
    this._currentIndex.next(value);
  }

  @Input()
  get steps() {
    return this._steps$.value;
  }

  set steps(values) {
    this._steps$.next(values);
  }

  stepClick(i, step) {
    if (step.enabled) {
      this.stepClicked.next(i);
    }
  }

  constructor() {}

  ngOnInit() {}
}
