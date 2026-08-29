import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, throwError } from 'rxjs';
import { AlertService } from '../services/alert/alert.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
const alertService=inject(AlertService);
  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      switch (error.status) {

        case 400:
          alertService.showAlerCancel('Bad Request', error.error.message, 'alert');
          break;

        case 401:
          alertService.showAlerCancel('Unauthorized', error.error.message, 'alert');
          break;

        case 403:
          alertService.showAlerCancel('Forbidden', error.error.message, 'alert');
          break;

        case 404:
          alertService.showAlerCancel('Bad Request', error.error.message, 'alert');
          break;

        case 500:
          alertService.showAlerCancel('Bad Request', error.error.message, 'alert');
          break;
          
        default:
          alertService.showAlerCancel(error.error.code, error.error.message, 'alert');
      }

      return throwError(() => error);

    })

  );

};