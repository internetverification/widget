import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { svgTemplateCard, svgTemplateFace } from '../../../svg.templates';

@Component({
  selector: 'ivw-svg-overlay',
  templateUrl: './svg-overlay.component.html',
  styleUrls: ['./svg-overlay.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SvgOverlayComponent implements OnInit {
  @Input()
  type: string;

  private color$ = new BehaviorSubject('rgba(139, 139, 139, 0.7)');

  @Input()
  set color(value) {
    this.color$.next(value);
  }

  get color() {
    return this.color$.value;
  }

  cardTemplate$ = this.color$.pipe(
    map(color => {
      return this.trust(svgTemplateCard(color));
    })
  );

  faceTemplate$ = this.color$.pipe(
    map(color => {
      return this.trust(svgTemplateFace(color));
    })
  );

  constructor(private _sanitizer: DomSanitizer) {}

  private trust(str: string) {
    return this._sanitizer.bypassSecurityTrustHtml(str);
  }

  ngOnInit() {}
}
