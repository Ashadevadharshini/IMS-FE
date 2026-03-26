import { Routes } from '@angular/router';
import { Login } from './login/login';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { HrDashboard } from './hr-dashboard/hr-dashboard';
import { CandidateDashboard } from './candidate-dashboard/candidate-dashboard';
import { roleGuard } from './guards/role-guard';
import { Navigation } from './layout/navigation/navigation';
import { authGuard } from './guards/auth-guard';
import { CreateUser } from './create-user/create-user';
import { CandidateList } from './candidate-list/candidate-list';
import { Profile } from './profile/profile';

export const routes: Routes = [

  // 🔓 PUBLIC
  { path: 'login', component: Login },

  // 🔐 PROTECTED (WITH NAVIGATION LAYOUT)
  {
    path: '',
    component: Navigation,
    canActivate: [authGuard],
    children: [

      // 🔥 DEFAULT REDIRECT (can change later for role-based)
      { path: '', redirectTo: 'profile', pathMatch: 'full' },

      // ✅ PROFILE (no need authGuard again)
      { path: 'profile', component: Profile },

      // ✅ ADMIN
      { 
        path: 'admin', 
        component: AdminDashboard, 
        canActivate: [roleGuard], 
        data: { roles: ['ADMIN'] } 
      },

      // ✅ HR
      { 
        path: 'hr', 
        component: HrDashboard, 
        canActivate: [roleGuard], 
        data: { roles: ['HR'] }
      },
      
      // ✅ COMMON
      {
        path: 'candidate-list',
        component: CandidateList,
        canActivate: [roleGuard],
        data: { roles: ['HR', 'ADMIN'] }
      },

      {
        path: 'candidate',
        component: CandidateDashboard,
        canActivate: [roleGuard],
        data: { roles: ['CANDIDATE'] }
      },

      { 
        path: 'createUser', 
        component: CreateUser, 
        canActivate: [roleGuard], 
        data: { roles: ['ADMIN'] } 
      },

    ]
  },

  // ❌ INVALID ROUTE
  { path: '**', redirectTo: 'login' }

];