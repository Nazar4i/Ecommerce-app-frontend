import {Component, OnInit} from '@angular/core';
import {CartModelServer} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  public cartData: CartModelServer;
  public cartTotal: number;
  public authState: boolean;

  constructor(public cartService: CartService,
              public userService: UserService) {}

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

  deleteProductFromCart(index: number): void {
    this.cartService.deleteProductFromCart(index);
  }

}
