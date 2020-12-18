import {Injectable} from '@angular/core';
import {EnvironmentService} from './environment.service';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  auth: boolean = false;
  baseUrl: string;
  credentials = undefined;

  constructor(private http: HttpClient, private environment: EnvironmentService) {
    this.baseUrl = environment.baseUrl;
  }

  authenticate(credentials: { password: string; username: string }) {
    this.credentials = credentials;
    this.auth = false;
    return this.http.post(this.baseUrl + 'auth', undefined, undefined);

  }
}
