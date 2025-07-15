import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login-page/login-page';

export const routes: Routes = [
  {path:"",component:LoginPage},
  {path:"**",redirectTo:""}
];
