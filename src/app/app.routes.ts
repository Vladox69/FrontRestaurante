import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login-page/login-page';
import { Dashboard } from './pages/dashboard/dashboard';
import { WaiterMain } from './pages/waiter/waiter-main/waiter-main';
import { WaiterNewOrder } from './pages/waiter/waiter-new-order/waiter-new-order';
import { WaiterOrders } from './pages/waiter/waiter-orders/waiter-orders';

export const routes: Routes = [
  {path:"",component:LoginPage},
  {path:"waiter",component:Dashboard,children:[
    {path:"",component:WaiterMain },
    {path:"orders",component:WaiterOrders },
    {path:"new-order",component:WaiterNewOrder}
  ]},
  {path:"**",redirectTo:""}
];
