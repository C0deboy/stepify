import {Injectable} from '@angular/core';
import {Message} from './Message';
import {MessageType} from './MessageType';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class MessageService {

  public messages: Message[] = [];

  private disappearsAfter = 2500;
  private messageWaiting = 0;

  constructor(private router: Router) {
  }

  getMessages(): Message[] {
    return this.messages;
  }

  showMessage(message: Message) {
    this.pushMessage(message);
  }

  showSuccessMessage(text: string) {
    const message = new Message(text, MessageType.SUCCESS);
    this.pushMessage(message);
  }

  showErrorMessage(text: string) {
    const message = new Message(text, MessageType.ERROR);
    this.pushMessage(message);
  }

  showWarningMessage(text: string) {
    const message = new Message(text, MessageType.WARNING);
    this.pushMessage(message);
  }

  showInfoMessage(text: string) {
    const message = new Message(text, MessageType.INFO);
    this.pushMessage(message);
  }

  showMessageBasedOnError(error: HttpErrorResponse, defaultMessage?: string) {
    if (!this.checkIfAuthenticationFailed(error)) {
      console.log(error);

      if (defaultMessage) {
        this.showErrorMessage(defaultMessage);
      }

      switch (error.status) {
        case 504:
          this.showErrorMessage('Nie można połączyć się z serwerem.');
          break;
        case 404:
          this.router.navigate(['/notFound']);
          break;
        default:
          if (error.status >= 500) {
            this.showErrorMessage('Błąd serwera.');
          }
      }

      if (error.error.errors) {
        error.error.errors.forEach(fieldError => {
          this.showErrorMessage(fieldError.defaultMessage);
        });
      }
    }
  }

  private checkIfAuthenticationFailed(error: HttpErrorResponse) {
    function removeModalBackdropIfExists() {
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.parentElement.removeChild(modalBackdrop);
      }
    }

    if (error.status === 401) {
      this.showErrorMessage('Zaloguj się!');
      removeModalBackdropIfExists();
      this.router.navigate(['/login']);
      return true;
    } else if (error.error.error === 'invalid_grant') {
      localStorage.removeItem('username');
      this.showErrorMessage('Nieprawidłowy login lub hasło');
      return true;
    } else {
      return false;
    }
  }

  private pushMessage(message: Message) {
    if (this.messages.length >= 5) {
      this.messages.shift();
    }
    this.messages.push(message);
    this.hideMessageOneByOne();
  }

  private hideMessageOneByOne() {
    this.messageWaiting++;
    setTimeout(() => {
      this.messages.shift();
      this.messageWaiting--;
    }, this.disappearsAfter * this.messageWaiting);
  }
}
