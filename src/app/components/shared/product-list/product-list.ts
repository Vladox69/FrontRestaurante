import { Component, input } from '@angular/core';
import { Product } from '../../../interfaces/data/product.interface';
import { ProductItem } from "../product-item/product-item";

@Component({
  selector: 'shared-product-list',
  imports: [ProductItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  products = input.required<Product[]>();
  isLoading = input<boolean>(false);
}
