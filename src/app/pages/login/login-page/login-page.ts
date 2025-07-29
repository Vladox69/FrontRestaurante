import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Auth } from '../../../services/auth';
import { LoginBody } from '../../../interfaces/body/login.interface';
import { BusinessService } from '../../../services/business-service';
import { switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { StoreService } from '../../../services/store-service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  envs = environment;
  authService = inject(Auth);
  businessService = inject(BusinessService);
  storeService = inject(StoreService);
  router = inject(Router);
  options = ['MARCELO TUASA - MESERO', 'MATEO LLERENA - MESERO', 'COCINA COMMA'];
  selectedOption = '-';
  onLogin() {
    const form: LoginBody = {
      email: "",
      password: this.envs.demoPassword,
    };

    switch(this.selectedOption){
      case 'MARCELO TUASA - MESERO':
        form.email = this.envs.demoWMarceloEmail;
        break;
      case 'MATEO LLERENA - MESERO':
        form.email = this.envs.demoWMateoEmail;
        break;
      case 'COCINA COMMA':
        form.email = this.envs.demoWCocinaEmail;
        break;
    }

    this.authService
      .login(form)
      .pipe(
        tap((value) => this.storeService.validateToken(value)),
        switchMap(() => {
          const boss_id = parseInt(
            this.storeService.getDecodedToken()?.boss_id!
          );
          this.storeService.decoded.set(this.storeService.getDecodedToken())
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
