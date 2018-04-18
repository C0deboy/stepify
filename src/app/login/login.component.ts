import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public credentials = {username: '', password: ''};

  constructor(private service: LoginService) {}

  login() {
    this.service.getAccessToken(this.credentials);
  }

}
