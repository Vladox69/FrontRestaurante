import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Auth } from '../../../services/auth';
import { LoginBody } from '../../../interfaces/body/login.interface';
import { BusinessService } from '../../../services/business-service';
import { switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { StoreService } from '../../../services/store-service';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  envs = environment;
  authService = inject(Auth);
  businessService = inject(BusinessService);
  storeService = inject(StoreService);
  router = inject(Router);
  onLogin() {
    const form: LoginBody = {
      email: this.envs.demoEmail,
      password: this.envs.demoPassword,
    };
    this.authService
      .login(form)
      .pipe(
        tap((value) => this.storeService.validateToken(value)),
        switchMap(() => {
          const boss_id = parseInt(
            this.storeService.getDecodedToken()?.boss_id!
          );
          return this.businessService.getBusinessByUserId(boss_id).pipe(
            tap((value) => this.storeService.business.set(value)),
            tap((value) => this.storeService.saveBusinessLocalStorage(value))
          );
        })
      )
      .subscribe({
        next: (value) => {
          const role = this.storeService.getDecodedToken()?.role;
          this.router.navigate([role]);
        },
      });
  }
}
