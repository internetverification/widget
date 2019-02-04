import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { isDefined } from './rxjs.utils';
import { InitStepAction } from './state/store/actions/steps.actions';
import { StepPageComponent } from './pages/step-page/step-page.component';
import { IvWidgetConfig, Step } from './types';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _theme$: BehaviorSubject<
    IvWidgetConfig['theme']
  > = new BehaviorSubject(null);

  public get theme() {
    return this._theme$.value;
  }

  public set theme(value: IvWidgetConfig['theme']) {
    this._theme$.next(value);
  }

  private _config$: BehaviorSubject<
    IvWidgetConfig['config']
  > = new BehaviorSubject(null);

  public get config() {
    return this._config$.value;
  }

  public set config(value: IvWidgetConfig['config']) {
    this._config$.next(value);
  }

  private _steps$: BehaviorSubject<
    IvWidgetConfig['steps']
  > = new BehaviorSubject(null);

  public get steps() {
    return this._steps$.value;
  }

  public set steps(value: IvWidgetConfig['steps']) {
    this._steps$.next(value);
  }

  private _lang$: BehaviorSubject<IvWidgetConfig['lang']> = new BehaviorSubject(
    null
  );

  public get lang() {
    return this._lang$.value;
  }

  public set lang(value: IvWidgetConfig['lang']) {
    this._lang$.next(value);
  }

  public get currentLang() {
    return this.translationService.currentLang;
  }

  public set currentLang(value: string) {
    this.translationService.use(value);
  }

  public get theme$() {
    return this._theme$.pipe(
      map(theme => {
        return Object.assign(
          {
            summary: {
              step: {
                details: {
                  file: {
                    style: `
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    `
                  }
                },
                bar: {
                  style: `
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                  `
                }
              }
            }
          },
          theme || {}
        );
      })
    );
  }

  private listener = (() => {
    const path = location.hash.replace('#', '');
    const isPartOfWidget = this.router.config.find(x => x === path);
    if (isPartOfWidget) {
      this.router.navigate([path]);
    }
  }).bind(this);

  private initLangWatching() {
    this._lang$.pipe(isDefined).subscribe(lang => {
      Object.entries(lang).forEach(([key, values]) => {
        this.translationService.setTranslation(key, values, true);
      });
    });
    this.translationService.setDefaultLang('en');
  }

  private initSteps() {
    this._steps$.subscribe((steps: Step[]) => {
      this.router.config.splice(0, this.router.config.length);
      if (Array.isArray(steps)) {
        const stepsWithRoute = steps.map((x, i) => ({
          ...x,
          id: i,
          route: `step_${i}`
        }));
        stepsWithRoute.forEach((step, i) => {
          this.router.config.push({
            path: step.route,
            component: StepPageComponent,
            data: step
          });
        });
        this.router.config.push({
          path: 'ivw-summary',
          component: SummaryPageComponent
        });
        this.store.dispatch(new InitStepAction(stepsWithRoute));

        // FIXME: Hack to fix routing problem in angular element
        setTimeout(
          () => this.router.navigate([this.router.config[0].path]),
          10
        );
      }
    });
  }

  constructor(
    private router: Router,
    private translationService: TranslateService,
    private store: Store<{}>
  ) {
    this.initLangWatching();
    this.initSteps();

    // FIXME: Hack to fix routing problem in angular element
    window.addEventListener('hashchange', this.listener);
  }

  public addConfig(config: IvWidgetConfig) {
    this.steps = config.steps;
    this.theme = config.theme;
    this.lang = config.lang;
  }

  public destroy() {
    window.removeEventListener('hashchange', this.listener);
  }
}
