import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MessageService} from '../messages/message.service';

@Injectable()
export class LoginService {
  private baseURL = 'http://localhost:8080/';

  constructor(private router: Router, private httpClient: HttpClient, private messageService: MessageService) {}

  getAccessToken(credentials: { username: string; password: string }) {
    this.clearOldToken();
    const params = new URLSearchParams();
    params.append('username', credentials.username);
    params.append('password', credentials.password);
    params.append('grant_type', 'password');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('root:root'),
      })
    };

    this.httpClient.post(this.baseURL + 'oauth/token', params.toString(),  httpOptions)
      .subscribe(
        data => {
          this.saveToken(data);
          this.router.navigate(['/your-goals']);
          this.messageService.showSuccessMessage('Zalogowano pomyślnie.');
        },
        err => {
          console.log(err);
          this.messageService.showErrorMessage('Nieprawidłowy login lub hasło');
        });
  }

  saveToken(token) {
    localStorage.setItem('access_token', 'Bearer ' + token.access_token);
  }

  logout() {
    this.clearOldToken();
    this.router.navigate(['/']);
    this.messageService.showSuccessMessage('Wylogowano.');
  }

  private clearOldToken() {
    localStorage.removeItem('access_token');
  }
}
