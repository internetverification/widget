import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../../types';
import { BaseStepComponent } from '../base-step.class';

@Component({
  selector: 'ivw-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent extends BaseStepComponent implements OnInit {
  @Input()
  step: Step;

  constructor() {
    super();
  }

  ngOnInit() {}
}
