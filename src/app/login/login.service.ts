import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MessageService} from '../messages/message.service';

@Injectable()
export class LoginService {
  private baseURL = 'http://localhost:8080/';

  constructor(private _router: Router, private httpClient: HttpClient, private messageService: MessageService) {}

  getAccessToken(credentials: { username: string; password: string }) {
    const params = `username=${credentials.username}&password=${credentials.password}&grant_type=password`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('root:root'),
      })
    };

    this.httpClient.post(this.baseURL + 'oauth/token', params,  httpOptions)
      .subscribe(
        data => {
          this.saveToken(data);
          this.messageService.showSuccessMessage('Zalogowano pomyślnie.');
        },
        err => {
          console.log(err);
          this.messageService.showErrorMessage('Nieprawidłowy login lub hasło');
        });
  }

  saveToken(token) {
    localStorage.setItem('access_token', 'Bearer ' + token.access_token);
    this._router.navigate(['/']);
  }

  checkCredentials() {
    if (!localStorage.getItem('access_token')) {
      this._router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this._router.navigate(['/']);
  }
}
