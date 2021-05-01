import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/users/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login | Tweeter' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign Up | Tweeter' }
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    data: { title: 'Home | Tweeter' }
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UsersComponent,
    data: { title: 'Users | Tweeter' }
  },
  {
    path: 'users/profile/:userId',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    data: { title: 'Profile | Tweeter' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
