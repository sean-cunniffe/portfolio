import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {Injectable} from '@angular/core';
import {catchError, retry} from 'rxjs/operators';
@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });

    if (this.authenticationService.credentials !== undefined) {
      xhr = req.clone({
        headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
          .set('Authorization','Basic '
            +btoa(`${this.authenticationService.credentials.username}:${this.authenticationService.credentials.password}`))
      });

    }
    return next.handle(xhr);
  }

}
