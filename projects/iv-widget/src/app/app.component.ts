import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IvWidgetConfig, StepState } from './types';
import { ConfigService } from './config.service';
import { Router, ActivatedRoute, NavigationEnd, Route } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { oc } from 'ts-optchain';

@Component({
  selector: 'ivw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @Input()
  get theme() {
    return this.configService.theme;
  }

  set theme(value) {
    this.configService.theme = value;
  }

  @Input()
  get lang() {
    return this.configService.lang;
  }

  set lang(value) {
    this.configService.lang = value;
  }

  @Input()
  get steps() {
    return this.configService.steps;
  }

  set steps(value) {
    this.configService.steps = value;
  }

  @Input()
  get config() {
    return this.configService.config;
  }

  set config(value) {
    this.configService.config = value;
  }

  @Input()
  get currentLang() {
    return this.configService.currentLang;
  }

  set currentLang(value) {
    this.configService.currentLang = value;
  }

  public currentStepId$ = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    map((r: any) => {
      return this.router.config.findIndex(
        x => r.url.replace('/', '') === x.path
      );
    })
  );

  public steps$ = this.store.select('steps').pipe(
    map((steps: { [key: string]: StepState }) =>
      Object.keys(steps).map(key => steps[key])
    ),
    map(steps => {
      const bSteps = steps.map(step => {
        return {
          enabled: true,
          state: oc(step).progress.state('BLANK')
        };
      });
      return [
        ...bSteps,
        {
          enabled: steps
            .filter(s => !s.config.hideInSummary)
            .every(s => oc(s).progress.state('BLANK') !== 'BLANK'),
          state: 'BLANK'
        }
      ];
    })
  );

  public navigate(id: number) {
    this.router.navigate([this.router.config[id].path]);
  }

  constructor(
    private router: Router,
    private configService: ConfigService,
    private store: Store<{}>
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.configService.destroy();
  }
}
