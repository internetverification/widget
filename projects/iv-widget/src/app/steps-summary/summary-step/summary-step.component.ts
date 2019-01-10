import { Component, OnInit, Input } from '@angular/core';
import { StepState } from '../../types';

@Component({
  selector: 'ivw-summary-step',
  templateUrl: './summary-step.component.html',
  styleUrls: ['./summary-step.component.scss']
})
export class SummaryStepComponent implements OnInit {
  @Input()
  step: StepState;

  constructor() {}

  ngOnInit() {}
}
