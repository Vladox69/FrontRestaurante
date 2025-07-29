import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StoreService } from '../../../services/store-service';
import { RestaurantSignalRService } from '../../../services/restaurant-signalr-service';
import { Subscription } from 'rxjs';

interface MenuItem{
  path:string;
  icon:string;
  label:string;
}

@Component({
  selector: 'shared-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit, OnDestroy {
  isOpen = true;
  isMobile = false;
  storeService = inject(StoreService);
  signalRSerice = inject(RestaurantSignalRService);
  role = this.storeService.decoded()?.role;
  menuItems: MenuItem[] = [];
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit(): void {
    if (this.role) {
      this.menuItems = this.role === 'waiter'
        ? [
            { path: '/waiter', icon: '📊', label: 'Dashboard' },
          { path: 'new-order', icon: '🛍️', label: 'Nueva Orden' },
          { path: 'orders', icon: '👥', label: 'Ordenes' },
        ]
      : [
          { path: '/cook', icon: '📊', label: 'Dashboard' }
        ];
    }
    this.signalRSerice.startConnection();
  }
  ngOnDestroy(): void {
    this.signalRSerice.stopConnection();
  }
}
