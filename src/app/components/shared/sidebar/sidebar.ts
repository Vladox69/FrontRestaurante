import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'shared-sidebar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  isOpen = true;
  isMobile = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  menuItems = [
    { path: '/waiter', icon: '📊', label: 'Dashboard' },
    { path: 'new-order', icon: '🛍️', label: 'Nueva Ordern' },
    { path: 'orders', icon: '👥', label: 'Ordenes' },
    { path: 'settings', icon: '⚙️', label: 'Configuración' },
  ];
}
