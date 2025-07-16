import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login-page/login-page';
import { Dashboard } from './pages/dashboard/dashboard';
import { WaiterMain } from './pages/waiter/waiter-main/waiter-main';
import { WaiterOrder } from './pages/waiter/waiter-order/waiter-order';

export const routes: Routes = [
  {path:"",component:LoginPage},
  {path:"waiter",component:Dashboard,children:[
    {path:"",component:WaiterMain },
    {path:"orders",component:WaiterOrder}
  ]},
  {path:"**",redirectTo:""}
];
