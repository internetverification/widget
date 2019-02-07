import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { IvWidgetConfig } from './app/types';
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
