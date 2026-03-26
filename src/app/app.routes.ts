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
import { InterviewerForm } from './interviewer-form/interviewer-form';
import { AssignCandidate } from './assign-candidate/assign-candidate';

export const routes: Routes = [

  // 🔓 PUBLIC
  { path: 'login', component: Login },

  // 🔐 PROTECTED (WITH NAVIGATION LAYOUT)
  {
    path: '',
    component: Navigation,
    canActivate: [authGuard],
    children: [

      { path: '', redirectTo: 'profile', pathMatch: 'full' },

      { path: 'profile', component: Profile },

      { 
        path: 'admin', 
        component: AdminDashboard, 
        canActivate: [roleGuard], 
        data: { roles: ['ADMIN'] } 
      },

      { 
        path: 'hr', 
        component: HrDashboard, 
        canActivate: [roleGuard], 
        data: { roles: ['HR'] }
      },
      {
        path:'panel',
        component:HrDashboard,
        canActivate:[roleGuard],
        data:{roles:['PANEL']}
      },
      
      {
        path: 'candidate-list',
        component: CandidateList,
        canActivate: [roleGuard],
        data: { roles: ['HR', 'ADMIN'] }
      },
      {
        path:'addPanel',
        component:InterviewerForm,
        canActivate:[roleGuard],
        data:{roles:['PANEL']}
      },

      {
        path:'assignCandidate',
        component:AssignCandidate,
        canActivate:[roleGuard],
        data:{roles:['HR']}
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

 
  { path: '**', redirectTo: 'login' }

];