import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { oc } from 'ts-optchain';
import { InformationStepState, InformationStepField } from '../../types';
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
    const fields = oc(this.step).config.fields([]);
    const formConfig = fields.reduce((prev, current) => {
      return {
        ...prev,
        [current.name]: [this.getValue(current), this.getValidators(current)]
      };
    }, {});

    this.formGroup = this._fb.group(formConfig);
  }

  private getValidators(field: InformationStepField) {
    let validators = field.optional ? [] : [Validators.required];
    validators = field.pattern
      ? [...validators, Validators.pattern(field.pattern)]
      : validators;

    switch (field.type) {
      case 'email':
        return [Validators.email, ...validators];
      default:
        return [...validators];
    }
  }

  private getValue(field: InformationStepField): string {
    return oc(this.step).payload[field.name]('');
  }

  submit() {
    this.submitStep.next(this.formGroup.value);
    this.nextStep.next();
  }
}
