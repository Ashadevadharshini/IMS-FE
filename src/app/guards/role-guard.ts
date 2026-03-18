import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route) => {

  const router = inject(Router);

  const role = localStorage.getItem('role');
  const expectedRole = route.data?.['role'];

  console.log("ROLE:", role);
  console.log("EXPECTED:", expectedRole);

  if (role?.includes(expectedRole)) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};