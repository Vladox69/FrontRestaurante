import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Auth } from '../../../services/auth';
import { Login } from '../../../interfaces/body/login.interface';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  envs=environment;
  authService=inject(Auth);
  onLogin(){
    const form:Login={
      email:this.envs.demoEmail,
      password:this.envs.demoPassword
    }
    this.authService.login(form);
  }
}
