import { Component, inject, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store-service';
import { CookService } from '../../../services/cook-service';

@Component({
  selector: 'app-cook-main',
  imports: [],
  templateUrl: './cook-main.html',
  styleUrl: './cook-main.css'
})
export class CookMain implements OnInit {
  storeService = inject(StoreService);
  cookService = inject(CookService);

  ngOnInit() {

  }
}
