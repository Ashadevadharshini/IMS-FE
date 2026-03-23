import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route) => {

  const router = inject(Router);

  const userRole = localStorage.getItem('role'); // e.g. "HR"

  const allowedRoles = route.data?.['roles'] as string[];

  console.log("USER ROLE:", userRole);
  console.log("ALLOWED ROLES:", allowedRoles);

  if (allowedRoles && allowedRoles.includes(userRole!)) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};