import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

import { UserService } from '../../views/auth/services/user.service';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  const userService = inject(UserService);
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err) => {
      const message = err?.error?.message || 'Something unexpectedly happened! Try again later.';
      if (err.status === 401) userService.logout();
      else snackBar.open(message, 'Close', { duration: 5000 });
      return throwError(() => err);
    })
  );
};
