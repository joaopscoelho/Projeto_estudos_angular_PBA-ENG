import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { routes } from './app.routes';
import { GuidedTourModule, GuidedTourService, WindowRefService } from 'ngx-guided-tour';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    // provideClientHydration(), // É interessante, mas tem que estudas mais para entender o comportamento
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    // Provider padrao 
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    MessageService,
    DialogService,
    ConfirmationService,
    GuidedTourService,
    WindowRefService,
  ]
};
