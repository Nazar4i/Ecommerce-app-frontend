import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ProductResponseModel} from '../../models/product.model'

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html'
})
export class ThankyouComponent {
  public message: string;
  public orderId: number;
  public products: ProductResponseModel[] = [];
  public cartTotal: number;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
    message: string,
    products: ProductResponseModel[],
    orderId: number,
    total: number
    };

    this.message = state.message;
    this.products = state.products;
    console.log(this.products);
    this.orderId = state.orderId;
    this.cartTotal = state.total;
  }
}


