import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppComponent } from './app.component';
import { StepModule } from './steps/step/step.module';
import { IvWidgetConfig } from './types';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { StepPageComponent } from './step-page/step-page.component';
import { StoreModule } from './state/store/store.module';
import { EffectsModule } from './state/effects/effects.module';
import { DeviceTypeService } from './device-type.service';
import { SummaryPageComponent } from './summary-page/summary-page.component';
import { SummaryStepModule } from './steps-summary/summary-step/summary-step.module';
import { WidgetStepsBarModule } from './components/widget-steps-bar/widget-steps-bar.module';
import { ButtonModule } from './components/button/button.module';
import { ThemeModule } from './theme/theme.module';
import { TrustedHtmlModule } from './pipes/trusted-html/trusted-html.module';

@NgModule({
  declarations: [AppComponent, StepPageComponent, SummaryPageComponent],
  imports: [
    BrowserModule,
    StepModule,
    SummaryStepModule,
    WidgetStepsBarModule,
    RouterModule.forRoot([], { useHash: true }),
    ButtonModule,
    StoreModule,
    EffectsModule,
    ThemeModule,
    TrustedHtmlModule,
    TranslateModule.forRoot()
  ],
  providers: [DeviceTypeService],
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
