import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { pluck, map } from 'rxjs/operators';

import { isDefined } from './rxjs.utils';
import { InitStepAction } from './state/store/actions/steps.actions';
import { StepPageComponent } from './step-page/step-page.component';
import { IvWidgetConfig, Step } from './types';
import { SummaryPageComponent } from './summary-page/summary-page.component';

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

  private _config$: ReplaySubject<IvWidgetConfig> = new ReplaySubject();
  public get config$() {
    return this._config$.asObservable();
  }

  public get theme$() {
    return this._theme$.pipe(
      map(theme => {
        return Object.assign(
          {
            summary: {
              step: {
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

  private initLangWatching() {
    this._lang$.pipe(isDefined).subscribe(lang => {
      Object.entries(lang).forEach(([key, values]) => {
        this.translationService.setTranslation(key, values, true);
      });
    });
    this.translationService.setDefaultLang('en');
  }

  private initSteps() {
    this.config$.pipe(pluck('steps')).subscribe((steps: Step[]) => {
      this.router.config.splice(0, this.router.config.length);
      steps.forEach((step, i) => {
        this.router.config.push({
          path: i === 0 ? '' : `step_${i}`,
          component: StepPageComponent,
          data: step
        });
      });

      this.router.config.push({
        path: 'ivw-summary',
        component: SummaryPageComponent
      });

      // FIXME: Hack to fix routing problem in angular element
      this.router.navigate(['']);
      this.store.dispatch(new InitStepAction(steps));
    });

    // FIXME: Hack to fix routing problem in angular element
    window.addEventListener('hashchange', () => {
      this.router.navigate([window.location.hash.replace('#', '')]);
    });
  }

  constructor(
    private router: Router,
    private translationService: TranslateService,
    private store: Store<{}>
  ) {
    this.initLangWatching();
    this.initSteps();
  }

  public addConfig(config: IvWidgetConfig) {
    this._config$.next(config);
    this.theme = config.theme;
    this.lang = config.lang;
  }
}
