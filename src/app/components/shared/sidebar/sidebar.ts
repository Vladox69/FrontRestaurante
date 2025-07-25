import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StoreService } from '../../../services/store-service';
import { RestaurantSignalRService } from '../../../services/restaurant-signalr-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shared-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit, OnDestroy {
  private subs = new Subscription();
  isOpen = true;
  isMobile = false;
  storeService = inject(StoreService);
  signalRSerice = inject(RestaurantSignalRService);
  role = this.storeService.decoded()?.role;
  menuItems =
    this.role === 'waiter'
      ? [
          { path: '/waiter', icon: '📊', label: 'Dashboard' },
          { path: 'new-order', icon: '🛍️', label: 'Nueva Orden' },
          { path: 'orders', icon: '👥', label: 'Ordenes' },
        ]
      : [
          { path: '/cook', icon: '📊', label: 'Dashboard' },
          { path: 'order', icon: '🛍️', label: 'Orden' },
        ];
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit(): void {
    this.signalRSerice.startConnection();
    if (this.role === 'waiter') {
      this.subs.add(
        this.signalRSerice.waiterNotifications$.subscribe((data) => {
          console.log(`Waiter Notification:`, data);
        })
      );
    } else {
      this.subs.add(
        this.signalRSerice.cookNotifications$.subscribe((data) => {
          console.log(`Cook Notification:`, data);
        })
      );
    }
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
