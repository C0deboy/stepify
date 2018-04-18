import {LoginService} from './login.service';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the loginService token from the service.
    const authToken = localStorage.getItem('access_token');

    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });

      return next.handle(authReq);
    }

    // send cloned request with header to the next handler.

    return next.handle(req);
  }
}
