import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { IvWidgetConfig } from './app/types';
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Add global function to allow other application to initialize the component
export const createIvWidget = function(
  idSelector: string,
  config: IvWidgetConfig = {
    idToken: '',
    steps: [],
    config: { apiUrl: '', tenantId: '', serviceId: '', submissionId: '' }
  }
) {
  const el = document.getElementById(idSelector);
  const widget: any = document.createElement('iv-widget');
  widget.steps = config.steps;
  widget.lang = config.lang;
  widget.theme = config.theme;
  widget.config = config.config;
  el.appendChild(widget);
  return widget;
};

(window as any).createIvWidget = createIvWidget;
