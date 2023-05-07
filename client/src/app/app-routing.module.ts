import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './services/auth.guard';
import { AdminAuthGuard } from './services/admin-auth.guard';

const routes: Routes = [

  { path: 'users', component: UsersComponent
  //  , canActivate: [AuthGuard]
 },

  {
    path: 'welcome',
    pathMatch: 'full',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'other',
    pathMatch: 'full',
    loadChildren: () => import('./other/other.module').then(m => m.OtherModule)
  },
  {
    path: 'personal-details',
    pathMatch: 'full',
    loadChildren: () => import('./personal-details/personal-details.module').then(m => m.PersonalDetailsModule)
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'registration',
    pathMatch: 'full',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: '**',
    redirectTo: 'welcome'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
