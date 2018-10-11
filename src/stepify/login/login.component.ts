import {Component} from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'stepify-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public credentials = {username: '', password: ''};

  constructor(private service: LoginService) {
  }

  login() {
    this.service.getAccessToken(this.credentials);
  }
}
