import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ivw-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Output()
  click = new EventEmitter();

  private _disabled$ = new BehaviorSubject(false);

  @Input()
  public get disabled() {
    return this._disabled$.value;
  }

  public set disabled(value: boolean) {
    this._disabled$.next(value);
  }

  constructor() {}

  ngOnInit() {}
}
