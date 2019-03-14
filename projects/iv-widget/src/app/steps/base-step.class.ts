import { Output, EventEmitter } from '@angular/core';

export abstract class BaseStepComponent {
  @Output()
  nextStep = new EventEmitter();

  @Output()
  previousStep = new EventEmitter();

  @Output()
  error = new EventEmitter();

  @Output()
  submitStep = new EventEmitter();
}
