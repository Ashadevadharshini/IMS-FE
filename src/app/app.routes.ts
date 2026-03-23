import { Routes } from '@angular/router';
import { Login } from './login/login';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { HrDashboard } from './hr-dashboard/hr-dashboard';
import { CandidateDashboard } from './candidate-dashboard/candidate-dashboard';
import { roleGuard } from './guards/role-guard';
import { Navigation } from './layout/navigation/navigation';
import { Home } from './home/home';
import { authGuard } from './guards/auth-guard';
import { CreateUser } from './create-user/create-user';
import { CandidateList } from './candidate-list/candidate-list';

export const routes: Routes = [

  // Public Route
  { path: 'login', component: Login },

  {
    path: '',
    component: Navigation,
    canActivate: [authGuard],
    children: [

      { path: '', redirectTo: 'admin', pathMatch: 'full' },

      { path: 'home', component: Home },

      { 
        path: 'admin', 
        component: AdminDashboard, 
        canActivate: [roleGuard], 
        data: { role: 'ADMIN' } 
      },

      { 
        path: 'candidate-list', 
        component: AdminDashboard, 
        canActivate: [roleGuard], 
        data: { role: 'ADMIN' } 
      },

      { 
        path: 'hr', 
        component: HrDashboard, 
        canActivate: [roleGuard], 
        data: { role: 'HR' } 
      },


      { 
        path: 'candidate', 
        component: CandidateDashboard, 
        canActivate: [roleGuard], 
        data: { role: 'CANDIDATE' } 
      },

      { 
        path: 'createUser', 
        component: CreateUser, 
        canActivate: [roleGuard], 
        data: { role: 'ADMIN' } 
      },
      { 
        path: 'candidateList', 
        component: CandidateList, 
        canActivate: [roleGuard], 
        data: { role: 'HR' } 
      },

    ]
  },

  // Only keep this
  { path: '**', redirectTo: 'login' }

];