import { Component, inject, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of, tap } from 'rxjs';
import { WaiterService } from '../../../services/waiter-service';

@Component({
  selector: 'app-waiter-main',
  imports: [],
  templateUrl: './waiter-main.html',
  styleUrl: './waiter-main.css',
})
export class WaiterMain implements OnInit {
  storeService = inject(StoreService);
  waiterService = inject(WaiterService);

  ngOnInit() {
    this.loadWaiter();
  }

  loadWaiter() {
    if (!this.storeService.waiter()) {
      const id = this.storeService.decoded()?.sub;
      this.waiterService.getWaitersByUserId(parseInt(id!)).pipe(
        tap((value) => this.storeService.saveWaiterLocalStorage(value)),
        tap((value) => this.storeService.waiter.set(value))
      ).subscribe({
        next:(value)=> {
          console.log(value);
        },
      });
    }
  }
}
