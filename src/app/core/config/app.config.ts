import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from '../../app.routes';
import { authInterceptor } from '../interceptor/auth.interceptor';
import { errorInterceptor } from '../interceptor/error.interceptor';
import { TitleService } from '../services/title-service.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    {
      provide: TitleStrategy,
      useClass: TitleService
    }
  ],
};
