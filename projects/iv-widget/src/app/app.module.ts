import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { AppComponent } from './app.component';
import { WidgetStepsBarModule } from './components/widget-steps-bar/widget-steps-bar.module';
import { DeviceTypeService } from './device-type.service';
import { StepPageComponent } from './pages/step-page/step-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { SharedModule } from './shared/shared.module';
import { EffectsModule } from './state/effects/effects.module';
import { StoreModule } from './state/store/store.module';
import { SummaryStepModule } from './steps-summary/summary-step/summary-step.module';
import { StepModule } from './steps/step/step.module';
import { IvWidgetConfig } from './types';
import { THEME_PROVIDER_TOKEN } from './directives/theme.directive';
import { ConfigService } from './config.service';

@NgModule({
  declarations: [AppComponent, StepPageComponent, SummaryPageComponent],
  imports: [
    BrowserModule,
    StepModule,
    SummaryStepModule,
    WidgetStepsBarModule,
    RouterModule.forRoot([], { useHash: true }),
    StoreModule,
    EffectsModule,
    SharedModule,
    TranslateModule.forRoot()
  ],
  providers: [
    DeviceTypeService,
    { provide: THEME_PROVIDER_TOKEN, useExisting: ConfigService }
  ],
  entryComponents: [AppComponent, StepPageComponent, SummaryPageComponent]
  // bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(
      AppComponent,
      this.injector
    );
    const el = createCustomElement(AppComponent, {
      injector: this.injector,
      strategyFactory
    });
    customElements.define('iv-widget', el);
  }
}

// Add global function to allow other application to initialize the component
(window as any).createIvWidget = function(
  idSelector: string,
  config: IvWidgetConfig = { idToken: '', steps: [] }
) {
  const el = document.getElementById(idSelector);
  const widget: any = document.createElement('iv-widget');
  widget.config = config;
  el.appendChild(widget);
  return widget;
};
