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
    { path: '/', icon: '📊', label: 'Dashboard' },
    { path: 'orders', icon: '🛍️', label: 'Productos' },
    { path: 'users', icon: '👥', label: 'Usuarios' },
    { path: 'settings', icon: '⚙️', label: 'Configuración' },
  ];
}
