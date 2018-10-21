import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {StepifyModule} from './stepify/stepify.module';
import {environment} from './environments/environment';

import 'hammerjs';

declare var $: any;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(StepifyModule)
  .catch(err => console.log(err));

