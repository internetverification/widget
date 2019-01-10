import { Component, Input, OnInit } from '@angular/core';

import { StepState } from '../../types';
import { BaseStepComponent } from '../base-step.class';

@Component({
  selector: 'ivw-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent extends BaseStepComponent implements OnInit {
  @Input()
  step: StepState;

  constructor() {
    super();
  }

  ngOnInit() {}
}
