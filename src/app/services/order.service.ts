import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProductResponseModel} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly serverUrl = environment.SERVER_URL;

  constructor(private http: HttpClient) {}

  getSingleOrder(orderId: number) {
    return this.http.get<ProductResponseModel[]>(this.serverUrl + '/orders/' + orderId).toPromise();
  }
}



