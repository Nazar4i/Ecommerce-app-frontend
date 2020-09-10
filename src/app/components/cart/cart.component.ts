import {Component, OnInit} from '@angular/core';
import {CartModelServer} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartData: CartModelServer;
  public cartTotal: number;
  public subTotal: number;

  constructor(public cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe((data: CartModelServer) => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  changeQuantity(index: number, increase: boolean) {
    this.cartService.updateCartItems(index, increase);
  }

  calculateSubTotal(index: number): void {
    this.cartService.calcSubTotal(index);
  }

  deleteProductFromCart(index: number): void {
    this.cartService.deleteProductFromCart(index);
  }
}
