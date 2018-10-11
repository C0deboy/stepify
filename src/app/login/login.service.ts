import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../messages/message.service';
import {User} from '../registration/user';
import {Properties} from '../properties';

@Injectable()
export class LoginService {
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

    this.httpClient.post(Properties.SERVER_BASE_URL + '/oauth/token', params.toString(), httpOptions)
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

  checkIfAuthenticationFailed(error: HttpErrorResponse) {
    function removeModalBackdropIfExists() {
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.parentElement.removeChild(modalBackdrop);
      }
    }

    if (error.status === 401) {
      this.messageService.showErrorMessage('Zaloguj się!');
      removeModalBackdropIfExists();
      this.router.navigate(['/login']);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.clearOldToken();
    this.router.navigate(['/']);
    this.messageService.showSuccessMessage('Wylogowano.');
  }

  createNewAccount(user: User) {
    return this.httpClient.post(Properties.SERVER_BASE_URL + '/users', user);
  }

  private clearOldToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
  }

}
