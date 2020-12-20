import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  baseUrl: string;

  constructor() {
    // this.baseUrl = 'https://portfolio-tracker-01.herokuapp.com/api/';
    this.baseUrl = 'http://localhost:8080/api/'
  }
}
