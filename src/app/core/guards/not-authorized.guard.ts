import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserService } from '../../views/auth/services/user.service';

export const NotAuthorizedGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  const authorized = userService.isAuthenticated();
  
  if (authorized) return true;
  return router.navigate(['/auth']);
};
