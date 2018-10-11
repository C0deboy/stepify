import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {User} from './user';
import {MessageService} from '../messages/message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'stepify-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public user = new User();

  constructor(private loginServcie: LoginService, private messageService: MessageService, private router: Router) {
  }

  ngOnInit() {
  }

  createAccount() {
    this.loginServcie.createNewAccount(this.user).subscribe(success => {
      console.log(success);
      this.messageService.showSuccessMessage('Konto stworzone.');
      this.router.navigate(['/login']);
    }, error => {
      console.log(error);
      this.messageService.showErrorMessage('Nie można stworzyć konta.');
    });
  }
}
