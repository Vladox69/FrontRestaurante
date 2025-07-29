import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login-page/login-page';
import { Dashboard } from './pages/dashboard/dashboard';
import { WaiterMain } from './pages/waiter/waiter-main/waiter-main';
import { WaiterNewOrder } from './pages/waiter/waiter-new-order/waiter-new-order';
import { WaiterOrders } from './pages/waiter/waiter-orders/waiter-orders';
import { CookMain } from './pages/cook/cook-main/cook-main';
import { CookOrder } from './pages/cook/cook-order/cook-order';

export const routes: Routes = [
  {path:"",component:LoginPage},
  {path:"waiter",component:Dashboard,children:[
    {path:"",component:WaiterMain },
    {path:"orders",component:WaiterOrders },
    {path:"new-order",component:WaiterNewOrder}
  ]},
  {path:"cook",component:Dashboard,children:[
    {path:"",component:CookMain},
    {path:"order/:id",component:CookOrder}
  ]},
  {path:"**",redirectTo:""}
];
