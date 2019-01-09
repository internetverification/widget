import { Component, OnInit } from '@angular/core';
import { BaseStepComponent } from '../base-step.class';

@Component({
  selector: 'ivw-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent extends BaseStepComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
