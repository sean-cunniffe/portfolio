import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  age: number;

  constructor() { }

  ngOnInit(): void {
    this.age = (+new Date()- +new Date("1997-11-02"))/31536000000;
    this.age = Math.floor(+this.age);
  }

}
