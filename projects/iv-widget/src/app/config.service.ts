import { Injectable, Inject } from "@angular/core";
import { IvWidgetConfig, Step } from "./types";
import { Subject, ReplaySubject, Observable } from "rxjs";
import { pluck, filter } from "rxjs/operators";
import { TranslateLoader, TranslateService } from "@ngx-translate/core";
import { isDefined } from "./rxjs.utils";
import { Router } from "@angular/router";
import { StepComponent } from "./steps/step/step.component";
import { StepPageComponent } from "./step-page/step-page.component";
@Injectable({
  providedIn: "root"
})
export class ConfigService {
  private _config$: ReplaySubject<IvWidgetConfig> = new ReplaySubject();
  public get config$() {
    return this._config$.asObservable();
  }

  public get theme$() {
    return this.config$.pipe(pluck("theme"));
  }

  constructor(router: Router, translationService: TranslateService) {
    this._config$
      .pipe(
        pluck("lang"),
        isDefined
      )
      .subscribe(lang => {
        Object.entries(lang).forEach(([key, values]) => {
          translationService.setTranslation(key, values, true);
        });
      });
    translationService.setDefaultLang("en");

    this.config$.pipe(pluck("steps")).subscribe((steps: Step[]) => {
      router.config.splice(0, router.config.length);
      steps.forEach((step, i) => {
        router.config.push({
          path: i === 0 ? "" : `step_${i}`,
          component: StepPageComponent,
          data: step
        });
      });
    });
  }

  public addConfig(config: IvWidgetConfig) {
    this._config$.next(config);
  }
}
