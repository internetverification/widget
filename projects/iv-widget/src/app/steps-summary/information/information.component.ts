import { Component, OnInit, Input } from '@angular/core';
import { InformationStepState } from '../../types';

@Component({
  selector: 'ivw-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  @Input()
  step: InformationStepState;

  constructor() {}

  ngOnInit() {}
}
