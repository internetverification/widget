import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { oc } from 'ts-optchain';
import { InformationStepState } from '../../types';
import { BaseStepComponent } from '../base-step.class';

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
