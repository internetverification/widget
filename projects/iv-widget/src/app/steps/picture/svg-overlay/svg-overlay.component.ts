import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { svgTemplateCard, svgTemplateFace } from '../../../svg.templates';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ivw-svg-overlay',
  templateUrl: './svg-overlay.component.html',
  styleUrls: ['./svg-overlay.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SvgOverlayComponent implements OnInit {
  @Input()
  type: string;

  cardTemplate = this.trust(svgTemplateCard());
  faceTemplate = this.trust(svgTemplateFace());

  constructor(private _sanitizer: DomSanitizer) {}

  private trust(str: string) {
    return this._sanitizer.bypassSecurityTrustHtml(str);
  }

  ngOnInit() {}
}
