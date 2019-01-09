import { Component, OnInit } from '@angular/core';
import { BaseStepComponent } from '../base-step.class';

@Component({
  selector: 'ivw-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent extends BaseStepComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
