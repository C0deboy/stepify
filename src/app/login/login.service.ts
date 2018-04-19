import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MessageService} from '../messages/message.service';
import {Goal} from '../application/goals/models/Goal';
import {User} from '../registration/user';

@Injectable()
export class LoginService {
  private baseURL = 'http://localhost:8080/';
  public currentUser: string;

  constructor(private router: Router, private httpClient: HttpClient, private messageService: MessageService) {
  }

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

    this.httpClient.post(this.baseURL + 'oauth/token', params.toString(), httpOptions)
      .subscribe(
        data => {
          this.saveToken(data, credentials.username);
          this.router.navigate(['/your-goals']);
          this.messageService.showSuccessMessage('Zalogowano pomyślnie.');
        },
        err => {
          console.log(err);

          localStorage.removeItem('username');
          this.messageService.showErrorMessage('Nieprawidłowy login lub hasło');
        });
  }

  saveToken(token, username) {
    localStorage.setItem('access_token', 'Bearer ' + token.access_token);
    localStorage.setItem('username', username);
  }

  logout() {
    this.clearOldToken();
    this.router.navigate(['/']);
    this.messageService.showSuccessMessage('Wylogowano.');
  }

  createNewAccount(user: User) {
    return this.httpClient.post(this.baseURL + '/users', user);
  }

  private clearOldToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
  }

}
