import { Component, OnInit, Input } from '@angular/core';
import { BaseStepComponent } from '../base-step.class';
import { FileStepState } from '../../types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ivw-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent extends BaseStepComponent implements OnInit {
  @Input()
  step: FileStepState;

  formGroup: FormGroup;

  constructor(private _fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.formGroup = this._fb.group({
      file: ['', [Validators.required]]
    });
  }

  submit() {
    this.submitStep.next(this.formGroup.value);
    this.nextStep.next();
  }
}
