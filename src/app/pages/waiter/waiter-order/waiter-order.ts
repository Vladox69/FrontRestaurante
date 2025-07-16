import { Component, inject } from '@angular/core';
import { BusinessService } from '../../../services/business-service';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-waiter-order',
  imports: [],
  templateUrl: './waiter-order.html',
  styleUrl: './waiter-order.css'
})
export class WaiterOrder {
  businessService=inject(BusinessService);
  authService=inject(Auth);

}
