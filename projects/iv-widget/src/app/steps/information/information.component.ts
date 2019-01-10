import { Component, OnInit, Input } from '@angular/core';
import { BaseStepComponent } from '../base-step.class';
import { StepState, InformationStepState } from '../../types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { oc } from 'ts-optchain';

@Component({
  selector: 'ivw-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent extends BaseStepComponent implements OnInit {
  @Input()
  step: InformationStepState;

  formGroup: FormGroup;

  constructor(private _fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.formGroup = this._fb.group({
      email: [
        oc(this.step).payload.email(''),
        [Validators.email, Validators.required]
      ],
      firstName: [oc(this.step).payload.firstName(''), Validators.required],
      lastName: [oc(this.step).payload.lastName(''), Validators.required]
    });
  }

  submit() {
    this.submitStep.next(this.formGroup.value);
    this.nextStep.next();
  }
}
