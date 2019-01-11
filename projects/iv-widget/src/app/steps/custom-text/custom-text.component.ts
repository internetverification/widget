import { Component, OnInit, Input } from '@angular/core';
import { CustomTextStep } from '../../types';
import { BaseStepComponent } from '../base-step.class';

@Component({
  selector: 'ivw-custom-text',
  templateUrl: './custom-text.component.html',
  styleUrls: ['./custom-text.component.scss']
})
export class CustomTextComponent extends BaseStepComponent implements OnInit {
  @Input()
  step: { config: CustomTextStep };

  constructor() {
    super();
  }
  ngOnInit(): void {}
}
