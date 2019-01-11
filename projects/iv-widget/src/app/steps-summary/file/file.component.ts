import { Component, OnInit, Input } from '@angular/core';
import { FileStepState } from '../../types';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ivw-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @Input()
  step: FileStepState;

  constructor(private _sanitizer: DomSanitizer) {}

  get name() {
    return this.step.payload.file.name;
  }

  get href() {
    return this._sanitizer.bypassSecurityTrustUrl(
      `data:application/octet-stream;charset=utf-16le;base64,${
        this.step.payload.file.content
      }`
    );
  }

  ngOnInit() {}
}
