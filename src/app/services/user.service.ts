import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of, from} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthResponseModel} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public auth: boolean;
  public authState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.auth);
  public userData$: BehaviorSubject<boolean | object> = new BehaviorSubject<AuthResponseModel | object>(null);
  public loginMessage$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public userRole: number;

  private readonly SERVER_URL = environment.SERVER_URL;
  private user;

  constructor(private httpClient: HttpClient) {}

  loginUser(email: string, password: string) {
    this.httpClient.post<AuthResponseModel>(`${this.SERVER_URL}/auth/login`, {email, password})
      .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((data: AuthResponseModel) => {
        if (typeof (data) === 'string') {
          this.loginMessage$.next(data);
        } else {
          this.auth = data.auth;
          this.userRole = data.role;
          this.authState$.next(this.auth);
          this.userData$.next(data);
        }
      });
  }

  logout() {
    this.auth = false;
    this.authState$.next(this.auth);
  }

  registerUser(formData: any, photoUrl?: string, typeOfUser?: string): Observable<{ message: string }> {
    const {fname, lname, email, password} = formData;
    console.log(formData);
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/auth/register`, {
      email,
      lname,
      fname,
      typeOfUser,
      password,
      photoUrl: photoUrl || null
    });
  }
}