import { Component, OnInit, Input } from '@angular/core';
import { InformationStepState } from '../../types';
import { oc } from 'ts-optchain';

@Component({
  selector: 'ivw-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  @Input()
  step: InformationStepState;

  public fields = [];

  constructor() {}

  ngOnInit() {
    const fields = this.step.config.fields;
    this.fields = fields.map(field => {
      return {
        label: field.labelTranslateKey,
        value: oc(this.step).payload[field.name]('')
      };
    });
  }
}
