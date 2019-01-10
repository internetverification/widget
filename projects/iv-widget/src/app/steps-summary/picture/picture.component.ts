import { Component, OnInit, Input } from '@angular/core';
import { PictureStepState } from '../../types';

@Component({
  selector: 'ivw-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  @Input()
  step: PictureStepState;

  constructor() {}

  ngOnInit() {}
}
