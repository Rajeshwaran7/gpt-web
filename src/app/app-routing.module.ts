import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SessionComponent } from './session/session.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Login page as default
  { path: 'signup', component: SignupComponent } ,// Route for sign-up page
  { path: 'session', component: SessionComponent }, // Route for sign-up page
  { path: 'profile', component: UserProfileComponent }, // User Profile route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
