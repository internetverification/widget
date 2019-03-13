import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import fr from './assets/lang/fr/fr';
import en from './assets/lang/en/en';
import bootstrap from './assets/themes/defaultTheme';
import customGreen from './assets/themes/customgreenTheme';
import niceAdmin from './assets/themes/niceAdminTheme';

import { AppModule } from './app/app.module';
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

(<any>window).IvWidget = (<any>window).IvWidget || {};

const setup = ivWidget => {
  return Object.assign(ivWidget, {
    lang: {
      fr,
      en
    },
    themes: {
      bootstrap,
      customGreen,
      niceAdmin
    }
  });
};

setup((<any>window).IvWidget);
(<any>window).createIvWidget = function(
  idSelector,
  config: any = {
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
