import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {username: '', password: ''};
  unAuth: Subject<boolean> = new Subject();

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.unAuth = new Subject();
    this.unAuth.next(false);
  }

  login() {
    let rep = this.authService.authenticate(this.credentials);
    rep.subscribe(response => {
      if (response[0] === 'Auth') {
        this.authService.auth = true;
        this.unAuth.next(false);
        this.router.navigate(['admin']);
      }
    });

    rep.pipe(
      retry(1),
      catchError((error: HttpErrorResponse)=>{
        let errorMessage = '';
        if(error.error instanceof ErrorEvent){
          errorMessage = `Error: ${error.error.message}`;

        }else{
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
